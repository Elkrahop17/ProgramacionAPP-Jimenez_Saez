import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from './viajes.service'; 

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

  constructor(private router: Router, private viajesService: ViajesService) {} // Inyecta el servicio

  buscarViajes() {
    this.searchAttempted = true;

    // Obtiene los viajes desde el servicio
    this.viajesDisponibles = this.viajesService.obtenerViajes();

    // Filtrar los resultados en función de los criterios de búsqueda
    this.viajesDisponibles = this.viajesDisponibles.filter(
      (viaje) =>
        viaje.pickupLocation.toLowerCase().includes(this.pickupLocation.toLowerCase()) &&
        viaje.destination.toLowerCase().includes(this.destination.toLowerCase())
    );
  }

  solicitarAsiento(viaje: any) {
    console.log('Solicitaste un asiento en el viaje de:', viaje.driverName);
  }

  goToInicio() {
    this.router.navigate(['tabs/inicio']);
  }
}



  

  


