import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor() { }

   // Método para validar la capacidad del vehículo
   validateCapacity(passengers: number, availableSeats: number): boolean {
    return passengers <= availableSeats;
  }
}
