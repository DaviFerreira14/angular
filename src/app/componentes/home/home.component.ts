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
  usuario: string | null = '';

  constructor(private router: Router) {
    this.usuario = localStorage.getItem('usuario')
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }
}
