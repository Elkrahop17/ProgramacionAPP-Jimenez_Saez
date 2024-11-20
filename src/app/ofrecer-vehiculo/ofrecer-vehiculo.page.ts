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
  availableSeats: number | null = null; // Número de asientos disponibles ingresados por el usuario
  costPerPassenger: number | null = null;

  readonly MAX_SEATS = 4; // Capacidad máxima permitida para los vehículos

  constructor(
    private router: Router,
    private viajesService: ViajesService
  ) {}

  closePage() {
    this.router.navigate(['tabs/inicio']);
  }

  publicarViaje() {
    // Verificar si todos los campos son válidos
    if (
      this.driverName &&
      this.vehicleBrand &&
      this.vehicleModel &&
      this.pickupLocation &&
      this.destination &&
      this.availableSeats &&
      this.costPerPassenger
    ) {
      // Validar la capacidad máxima permitida
      if (this.availableSeats > this.MAX_SEATS) {
        alert(`No puedes ofrecer más de ${this.MAX_SEATS} asientos. Por favor, corrige el número de asientos disponibles.`);
        return; // Detiene la ejecución si el número de asientos excede el máximo
      }

      // Crear el nuevo viaje
      const nuevoViaje = {
        driverName: this.driverName,
        vehicleDetails: `${this.vehicleBrand} ${this.vehicleModel} ${this.vehicleColor}`,
        pickupLocation: this.pickupLocation,
        destination: this.destination,
        availableSeats: this.availableSeats,
        costPerPassenger: this.costPerPassenger,
      };

      // Guarda el viaje en el servicio
      this.viajesService.agregarViaje(nuevoViaje);

      // Almacena el viaje actual en el servicio para que esté disponible en la página de seguimiento
      this.viajesService.setViajeActual(nuevoViaje);

      // Navega a la página de seguimiento
      this.router.navigate(['tabs/servicio']);
    } else {
      console.log('Por favor, completa todos los campos.');
      alert('Por favor, completa todos los campos.');
    }
  }
}
