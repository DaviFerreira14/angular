import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedCar: string = 'Ranger';

  carros = [
  {
    nome: 'Ranger',
    vendas: 3200,
    conectados: 700,
    update: 650,
    imagem: 'ranger.png'
  },
  {
    nome: 'Mustang',
    vendas: 1500,
    conectados: 500,
    update: 750,
    imagem: 'mustang.png'
  },
  {
    nome: 'Territory',
    vendas: 4560,
    conectados: 500,
    update: 3050,
    imagem: 'territory.png'
  },
  {
    nome: 'Bronco Sport',
    vendas: 1700,
    conectados: 950,
    update: 500,
    imagem: 'broncoSport.png'
  }
];

  get selectedCarData() {
    return this.carros.find(carro => carro.nome === this.selectedCar)!;
  }
}
