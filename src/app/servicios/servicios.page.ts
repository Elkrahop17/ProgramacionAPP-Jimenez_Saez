import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})

export class ServiciosPage {
  pickupLocation: string = '';
  destination: string = '';
  viajesDisponibles: any[] = [];
  searchAttempted: boolean = false;

  constructor(private router: Router) {}

  buscarViajes() {
    this.searchAttempted = true;
    
    // Simulación de datos obtenidos del backend
    this.viajesDisponibles = [
      {
        driverName: 'Carlos',
        vehicleDetails: 'Hyundai SUV Rojo',
        pickupLocation: 'Duoc UC',
        destination: 'La Florida',
        availableSeats: 3,
        costPerPassenger: 30,
      },
      {
        driverName: 'Ana',
        vehicleDetails: 'Nissan Azul',
        pickupLocation: 'Duoc UC',
        destination: 'Santiago Centro',
        availableSeats: 2,
        costPerPassenger: 25,
      },
    ];

    // Filtrar resultados (esto dependerá de tu backend)
    this.viajesDisponibles = this.viajesDisponibles.filter(
      (viaje) =>
        viaje.pickupLocation.toLowerCase().includes(this.pickupLocation.toLowerCase()) &&
        viaje.destination.toLowerCase().includes(this.destination.toLowerCase())
    );
  }

  solicitarAsiento(viaje: any) {
    // Lógica para solicitar un asiento en el viaje seleccionado
    console.log('Solicitaste un asiento en el viaje de:', viaje);
  }

  goToInicio() {
    this.router.navigate(['tabs/inicio']);
  }
}



  

  


