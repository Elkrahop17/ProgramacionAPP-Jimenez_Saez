import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from '../servicios/viajes.service';
import { AuthService } from '../services/auth.service'; // Servicio para obtener el correo del usuario logueado

@Component({
  selector: 'app-ofrecer-vehiculo',
  templateUrl: './ofrecer-vehiculo.page.html',
  styleUrls: ['./ofrecer-vehiculo.page.scss'],
})
export class OfrecerVehiculoPage {
  driverName: string = ''; // Nombre del conductor
  vehicleBrand: string = ''; // Marca del vehículo
  vehicleModel: string = ''; // Modelo del vehículo
  vehicleColor: string = ''; // Color del vehículo
  pickupLocation: string = ''; // Lugar de partida
  destination: string = ''; // Destino
  availableSeats: number | null = null; // Asientos disponibles
  costPerPassenger: number | null = null; // Costo por pasajero
  userEmail: string | null = null; // Correo del usuario logueado

  readonly MAX_SEATS = 4; // Capacidad máxima permitida para los vehículos

  constructor(
    private router: Router,
    private viajesService: ViajesService,
    private authService: AuthService // Inyección del servicio de autenticación
  ) {}

  async ngOnInit() {
    // Obtiene el correo del usuario logueado
    this.userEmail = await this.authService.getUserEmail();
  }

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
        alert(
          `No puedes ofrecer más de ${this.MAX_SEATS} asientos. Por favor, corrige el número de asientos disponibles.`
        );
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
        userEmail: this.userEmail, // Asocia el correo del usuario logueado
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
