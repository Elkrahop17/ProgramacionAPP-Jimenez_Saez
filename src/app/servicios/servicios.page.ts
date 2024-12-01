import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from './viajes.service';
import { PedidosService } from '../servicios/pedidos.service'; // Importa el servicio de pedidos
import { AuthService } from '../services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
  pickupLocation: string = ''; // Lugar de partida
  destination: string = ''; // Destino
  viajesDisponibles: any[] = []; // Lista de viajes disponibles
  searchAttempted: boolean = false; // Indicador para mostrar resultados
  userEmail: string | null = null; // Correo del usuario logueado

  constructor(
    private router: Router,
    private viajesService: ViajesService,
    private pedidosService: PedidosService, // Inyecta el servicio de pedidos
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {}

  async ngOnInit() {
    // Carga inicial: obtener el correo del usuario logueado
    this.userEmail = await this.authService.getUserEmail();

    // Obtén todos los viajes al iniciar la página
    this.viajesDisponibles = await this.viajesService.obtenerViajes();
  }

  buscarViajes() {
    this.searchAttempted = true;

    // Filtra los resultados en función de los criterios de búsqueda
    this.viajesDisponibles = this.viajesService.obtenerViajes().filter(
      (viaje) =>
        viaje.pickupLocation.toLowerCase().includes(this.pickupLocation.toLowerCase()) &&
        viaje.destination.toLowerCase().includes(this.destination.toLowerCase()) &&
        !viaje.isTaken // Solo mostramos viajes que no han sido tomados
    );
  }

  confirmarCompra(viaje: any) {
    // Si el viaje ya ha sido tomado, mostramos un mensaje en la card y no permitimos la compra
    if (viaje.isTaken) {
      alert('Este viaje ya ha sido tomado.');
      return;
    }

    // Verificar si el viaje fue creado por el usuario logueado
    if (viaje.userEmail === this.userEmail) {
      alert('No puedes tomar un viaje que tú mismo creaste.');
      return;
    }

    // Marca el viaje como tomado y actualiza la disponibilidad de asientos
    viaje.isTaken = true;
    this.viajesService.actualizarViaje(viaje);

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
