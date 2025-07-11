import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Vehicle {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3001/vehicles';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<{ vehicles: Vehicle[] }> {
    return this.http.get<{ vehicles: Vehicle[] }>(this.apiUrl);
  }
}
