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
      nome: ['', Validators.required],
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

    const { nome, senha, autoLogin } = this.loginForm.value;

    this.authService.login(nome, senha).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('nome', response.nome);

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

    mostrarSenha(passwordInput: HTMLInputElement, event: MouseEvent): void {
      const iconSpan = (event.currentTarget as HTMLElement).querySelector('.material-icons');
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          if (iconSpan) iconSpan.textContent = 'visibility_off';
        } else {
          passwordInput.type = 'password';
          if (iconSpan) iconSpan.textContent = 'visibility';
      }
  }
}