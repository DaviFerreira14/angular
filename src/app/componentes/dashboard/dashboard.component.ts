import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selectedCar: string = '';
  carros: any[] = [];
  vinDataList: any[] = [];
  vinCode: string = '';
  currentVinData: any = null; 
  nome: any;

  constructor(
    private vehicleService: VehicleService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.nome = localStorage.getItem('nome');
    this.vehicleService.getVehicles().subscribe({
      next: (res: { vehicles: any[] }) => {
        this.carros = res.vehicles;
        this.selectedCar = this.carros[0]?.vehicle || '';
      },
      error: (err: any) => {
        console.error('Erro ao carregar os veículos:', err);
      },
    });
  }

  searchVinData(): void {
    if (!this.vinCode.trim()) {
      return;
    }

    this.currentVinData = null;
    console.log('Enviando VIN:', this.vinCode.trim()); 

    this.http.post('http://localhost:3001/', { vin: this.vinCode.trim() }).subscribe({
      next: (data: any) => {
        console.log('Resposta recebida:', data); 
        this.currentVinData = { vin: this.vinCode.trim(), ...data };
      },
      error: (err: any) => {
        console.error('Erro ao buscar dados do VIN:', err);
        console.error('Status:', err.status);
        console.error('Erro completo:', err.error);
        this.currentVinData = { vin: this.vinCode.trim(), erro: true };
      },
    });
  }

  get selectedCarData() {
    return this.carros.find((carro) => carro.vehicle === this.selectedCar);
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    this.router.navigate(['/login']);
  }
}