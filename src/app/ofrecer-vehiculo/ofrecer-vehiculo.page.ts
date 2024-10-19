import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ofrecer-vehiculo',
  templateUrl: './ofrecer-vehiculo.page.html',
  styleUrls: ['./ofrecer-vehiculo.page.scss'],
})
export class OfrecerVehiculoPage {
  vehicleBrand: string = '';
  vehicleModel: string = '';
  vehicleColor: string = '';
  pickupLocation: string = '';
  destination: string = '';
  availableSeats: number | null = null;
  costPerPassenger: number | null = null;

  constructor(private router: Router) {}

   // Método para cerrar la página y regresar al inicio
  closePage() {
    this.router.navigate(['tabs/inicio']);
  }

  publicarViaje() {
    if (this.vehicleBrand && this.vehicleModel && this.pickupLocation && this.destination && this.availableSeats && this.costPerPassenger) {
      // Lógica para publicar el viaje (enviar al backend)
      console.log('Publicando viaje con los siguientes datos:', {
        vehicleBrand: this.vehicleBrand,
        vehicleModel: this.vehicleModel,
        vehicleColor: this.vehicleColor,
        pickupLocation: this.pickupLocation,
        destination: this.destination,
        availableSeats: this.availableSeats,
        costPerPassenger: this.costPerPassenger,
      });
    } else {
      console.log('Por favor, completa todos los campos.');
    }
  }
}
