import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from '../servicios/viajes.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ofrecer-vehiculo',
  templateUrl: './ofrecer-vehiculo.page.html',
  styleUrls: ['./ofrecer-vehiculo.page.scss'],
})
export class OfrecerVehiculoPage {
  driverName: string = '';
  vehicleBrand: string = '';
  vehicleModel: string = '';
  pickupLocation: string = '';
  destination: string = '';
  availableSeats: number | null = null;
  userEmail: string | null = null;
  costPerPassenger: number = 0;
  isVehicleOffered: boolean = false; // Nueva bandera para controlar si ya se publicó un vehículo

  readonly MAX_SEATS = 4;
  vehicleBrands = ['Toyota', 'Nissan', 'Ford', 'Chevrolet'];
  vehicleModels = ['Sedan', 'SUV', 'Camioneta'];

  constructor(
    private router: Router,
    private viajesService: ViajesService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    try {
      const firstName = await this.authService.getCurrentUserFirstName();
      if (firstName) {
        this.driverName = firstName;
      } else {
        console.warn('No se encontró un usuario logueado.');
      }
    } catch (error) {
      console.error('Error al obtener el nombre del conductor:', error);
    }

    // Verificar si el usuario ya ha ofrecido un vehículo
    this.userEmail = await this.authService.getUserEmail();
    this.isVehicleOffered = await this.viajesService.hasOfferedVehicle(this.userEmail!);
  }

  closePage() {
    this.router.navigate(['tabs/inicio']);
  }

  async publicarViaje() {
    if (this.isVehicleOffered) {
      alert('Ya has publicado un vehículo.');
      return;
    }

    if (this.driverName && this.vehicleBrand && this.vehicleModel && this.pickupLocation && this.destination && this.availableSeats && this.costPerPassenger) {
      if (this.availableSeats > this.MAX_SEATS) {
        alert(`Máximo ${this.MAX_SEATS} asientos permitidos.`);
        return;
      }

      const nuevoViaje = {
        driverName: this.driverName,
        vehicleDetails: `${this.vehicleBrand} ${this.vehicleModel}`,
        pickupLocation: this.pickupLocation,
        destination: this.destination,
        availableSeats: this.availableSeats,
        userEmail: this.userEmail,
        costPerPassenger: this.costPerPassenger
      };

      await this.viajesService.agregarViaje(nuevoViaje);
      this.viajesService.setViajeActual(nuevoViaje);

      // Marcar que ya se ofreció un vehículo
      this.isVehicleOffered = true;

      this.router.navigate(['tabs/servicio']);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  usarUbicacionActual() {
    this.pickupLocation = 'Duoc San Joaquin';
    console.log('Ubicación actual establecida:', this.pickupLocation);
  }
}
