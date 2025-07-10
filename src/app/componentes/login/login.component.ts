import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
      autoLogin: [false],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const autoLogin = localStorage.getItem('autoLogin') === 'true';

    if (token && autoLogin) {
      this.router.navigate(['home']);
    }
  }

  navegar() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    const { usuario, senha, autoLogin } = this.loginForm.value;

    this.authService.login(usuario, senha).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', response.usuario);

        if (autoLogin) {
          localStorage.setItem('autoLogin', 'true');
        } else {
          localStorage.removeItem('autoLogin');
        }

        this.router.navigate(['home']);
      },
      error: () => {
        this.errorMessage = 'Usuário ou senha inválidos.';
      },
    });
  }
}
