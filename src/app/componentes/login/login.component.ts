import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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
    });
  }

  navegar() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    const { usuario, senha } = this.loginForm.value;

    this.authService.login(usuario, senha).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['home']);
      },
      error: () => {
        this.errorMessage = 'Usuário ou senha inválidos.';
      },
    });
  }
}
