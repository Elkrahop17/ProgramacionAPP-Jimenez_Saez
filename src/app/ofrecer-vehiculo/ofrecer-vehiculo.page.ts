import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from '../servicios/viajes.service';
import { AuthService } from '../services/auth.service';
import { VehiculoService } from '../servicios/vehiculo.service';

@Component({
  selector: 'app-ofrecer-vehiculo',
  templateUrl: './ofrecer-vehiculo.page.html',
  styleUrls: ['./ofrecer-vehiculo.page.scss'],
})
export class OfrecerVehiculoPage implements OnInit {
  driverName: string = '';
  registeredVehicles: any[] = [];
  selectedVehicle: any = null;
  isVehicleOffered: boolean = false;
  userEmail: string | null = null;
  viajeEnCurso: boolean = false;
  // Nuevas propiedades para origen, destino, asientos y costo
  pickupLocation: string = '';
  destination: string = '';
  availableSeats: number = 1;
  costPerPassenger: number = 0;

  constructor(
    private router: Router,
    private viajesService: ViajesService,
    private authService: AuthService,
    private vehiculosService: VehiculoService
  ) {}

  

  async ngOnInit() {
    
    await this.loadDriverName();
    await this.checkIfVehicleOffered(); // Nueva función para verificar si hay un viaje en curso
    this.loadRegisteredVehicles();
    this.userEmail = await this.authService.getUserEmail();
    this.isVehicleOffered = await this.viajesService.hasOfferedVehicle(this.userEmail!);
    this.viajeEnCurso = await this.viajesService.tieneViajeEnCurso(this.userEmail!);
  
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { selectedVehicle: any };
    if (state?.selectedVehicle) {
      this.selectedVehicle = state.selectedVehicle;
    }
  }

  async loadDriverName() {
    const name = await this.authService.getCurrentUserFirstName();
    this.driverName = name ?? 'Conductor';
  }

  async checkIfVehicleOffered() {
    this.userEmail = await this.authService.getUserEmail();
    this.isVehicleOffered = await this.viajesService.hasOfferedVehicle(this.userEmail!);
  }

  loadRegisteredVehicles() {
    this.registeredVehicles = this.vehiculosService.obtenerVehiculos();
  }

  closePage() {
    this.router.navigate(['tabs/inicio']);
  }

  // Método que se ejecutará al intentar publicar el viaje
  async publicarViaje() {
    if (this.viajeEnCurso || this.isVehicleOffered) {
      alert('Ya tienes un viaje en curso o has ofrecido un vehículo.');
      return;
    }
    if (!this.selectedVehicle || !this.pickupLocation || !this.destination || !this.availableSeats || !this.costPerPassenger) {
      alert('Por favor, completa todos los campos del viaje.');
      return;
    }

    const nuevoViaje = {
      driverName: this.driverName,
      vehicleDetails: `${this.selectedVehicle.brand} ${this.selectedVehicle.model}`,
      pickupLocation: this.pickupLocation,
      destination: this.destination,
      availableSeats: this.availableSeats,
      costPerPassenger: this.costPerPassenger,
      userEmail: this.userEmail,
    };

    await this.viajesService.agregarViaje(nuevoViaje);

    this.isVehicleOffered = true;
    alert('¡Vehículo publicado con éxito!');
    this.router.navigate(['tabs/servicio']);
  }

    goToInicio(){
      this.router.navigate(['tabs/inicio']);
    }
}
