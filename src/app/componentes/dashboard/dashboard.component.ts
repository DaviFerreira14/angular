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

  vehicleVins: { [key: string]: string[] } = {
    Ranger: ['2FRHDUYS2Y63NHD22454'],
    Mustang: ['2RFAASDY54E4HDU34874'],
    Territory: ['2FRHDUYS2Y63NHD22455'],
    'Bronco Sport': ['2FRHDUYS2Y63NHD22854'],
  };
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
        this.loadVinData(this.selectedCar);
      },
      error: (err: any) => {
        console.error('Erro ao carregar os veículos:', err);
      },
    });
  }

  loadVinData(vehicle: string): void {
    const vins = this.vehicleVins[vehicle] || [];
    this.vinDataList = [];

    vins.forEach((vin) => {
      this.http.post('http://localhost:3001/', { vin }).subscribe({
        next: (data: any) => this.vinDataList.push({ vin, ...data }),
        error: () => this.vinDataList.push({ vin, erro: true }),
      });
    });
  }

  get selectedCarData() {
    return this.carros.find((carro) => carro.vehicle === this.selectedCar);
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
