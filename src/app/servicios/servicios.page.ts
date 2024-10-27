import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from './viajes.service';
import { PedidosService } from '../servicios/pedidos.service'; // Importa el servicio de pedidos

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

  constructor(
    private router: Router,
    private viajesService: ViajesService,
    private pedidosService: PedidosService // Inyecta el servicio de pedidos
  ) {}

  buscarViajes() {
    this.searchAttempted = true;

    // Obtiene los viajes desde el servicio
    this.viajesDisponibles = this.viajesService.obtenerViajes();

    // Filtra los resultados en función de los criterios de búsqueda
    this.viajesDisponibles = this.viajesDisponibles.filter(
      (viaje) =>
        viaje.pickupLocation.toLowerCase().includes(this.pickupLocation.toLowerCase()) &&
        viaje.destination.toLowerCase().includes(this.destination.toLowerCase())
    );
  }

  confirmarCompra(viaje: any) {
    // Guarda el viaje actual en el servicio de Viajes
    this.viajesService.setViajeActual(viaje);

    // Guarda el pedido completado en el servicio de Pedidos
    this.pedidosService.agregarPedido({
      title: viaje.title || 'Viaje Confirmado',
      nombreUsuario: viaje.driverName,
      modeloAuto: viaje.vehicleDetails || 'Modelo desconocido',
      fechaPedido: new Date().toLocaleDateString(),
      estado: 'Completado',
      price: viaje.costPerPassenger * viaje.availableSeats || 'Precio desconocido',
      rating: [1, 1, 1, 1, 1], // Ejemplo de calificación
    });

    console.log('Confirmaste la compra para el viaje de:', viaje.driverName);

    // Redirige a la página de confirmación de compra
    this.router.navigate(['/confirmar-compra'], { state: { viaje } });
  }

  solicitarAsiento(viaje: any) {
    console.log('Solicitaste un asiento en el viaje de:', viaje.driverName);
  }

  goToInicio() {
    this.router.navigate(['tabs/inicio']);
  }
}
