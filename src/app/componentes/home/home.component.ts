import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  nome: string | null = '';

  constructor(private router: Router) {
    this.nome = localStorage.getItem('nome') || 'Usuário';
  }

  logout() {
    console.log('Resposta do login:', );
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }
}
