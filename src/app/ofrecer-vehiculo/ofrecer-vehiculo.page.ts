// src/app/ofrecer-vehiculo/ofrecer-vehiculo.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from '../servicios/viajes.service';

@Component({
  selector: 'app-ofrecer-vehiculo',
  templateUrl: './ofrecer-vehiculo.page.html',
  styleUrls: ['./ofrecer-vehiculo.page.scss'],
})
export class OfrecerVehiculoPage {
  driverName: string = '';
  vehicleBrand: string = '';
  vehicleModel: string = '';
  vehicleColor: string = '';
  pickupLocation: string = '';
  destination: string = '';
  availableSeats: number | null = null;
  costPerPassenger: number | null = null;

  constructor(private router: Router, private viajesService: ViajesService) {} // Inyecta el servicio

  closePage() {
    this.router.navigate(['tabs/inicio']);
  }

  publicarViaje() {
    if (this.driverName && this.vehicleBrand && this.vehicleModel && this.pickupLocation && this.destination && this.availableSeats && this.costPerPassenger) {
      const nuevoViaje = {
        driverName: this.driverName,
        vehicleDetails: `${this.vehicleBrand} ${this.vehicleModel} ${this.vehicleColor}`,
        pickupLocation: this.pickupLocation,
        destination: this.destination,
        availableSeats: this.availableSeats,
        costPerPassenger: this.costPerPassenger
      };

      // Guarda el viaje en el servicio
      this.viajesService.agregarViaje(nuevoViaje);

      // Almacena el viaje actual en el servicio para que esté disponible en la página de seguimiento
      this.viajesService.setViajeActual(nuevoViaje);

      // Navega a la página de seguimiento
      this.router.navigate(['tabs/servicio']);
    } else {
      console.log('Por favor, completa todos los campos.');
    }
  }
}

