import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from '../servicios/pedidos.service'; // Importa el servicio de pedidos
import { AuthService } from '../services/auth.service'; // Importa el servicio de autenticación
import { ViajesService } from '../servicios/viajes.service'; // Asegúrate de tener este servicio importado

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
  isVehicleOffered: boolean = false; // Verifica si el usuario ha ofrecido un vehículo
  viajeEnCurso: boolean = false;
  

  constructor(
    private router: Router,
    private pedidosService: PedidosService, // Inyecta el servicio de pedidos
    private authService: AuthService, // Inyecta el servicio de autenticación
    private viajesService: ViajesService // Asegúrate de inyectar el servicio de viajes
  ) {}

  async ngOnInit() {
    // Carga inicial: obtener el correo del usuario logueado
    this.userEmail = await this.authService.getUserEmail();
    
    // Verificar si el usuario ha ofrecido un vehículo
    this.isVehicleOffered = await this.viajesService.hasOfferedVehicle(this.userEmail!);

    // Obtén todos los viajes al iniciar la página
    this.viajesDisponibles = await this.viajesService.obtenerViajes();

    // Verificar si el usuario tiene un viaje en curso
    this.viajeEnCurso = await this.viajesService.tieneViajeEnCurso(this.userEmail!);

  }

  buscarViajes() {
    if (this.viajeEnCurso) {
      alert('Ya tienes un viaje en curso, no puedes buscar más viajes.');
      return;
    }

    this.searchAttempted = true;

    this.viajesDisponibles = this.viajesService.obtenerViajes().filter(
      (viaje) =>
        viaje.pickupLocation.toLowerCase().includes(this.pickupLocation.toLowerCase()) &&
        viaje.destination.toLowerCase().includes(this.destination.toLowerCase()) &&
        !viaje.isTaken // Solo mostramos viajes que no han sido tomados
    );
  }

  confirmarCompra(viaje: any) {
    if (this.viajeEnCurso) {
      alert('Ya tienes un viaje en curso, no puedes agregar otro.');
      return;
    }

    if (viaje.isTaken) {
      alert('Este viaje ya ha sido tomado.');
      return;
    }

    if (viaje.userEmail === this.userEmail) {
      alert('No puedes tomar un viaje que tú mismo creaste.');
      return;
    }

    // Marca el viaje como tomado y actualiza la disponibilidad de asientos
    viaje.isTaken = true;
    this.viajesService.actualizarViaje(viaje);

    // Actualizamos el estado de viajeEnCurso
    this.viajeEnCurso = true;


    // Guarda el pedido completado en el servicio de Pedidos
    this.pedidosService.agregarPedido({
      title: viaje.title || 'Viaje Confirmado',
      nombreUsuario: viaje.driverName,
      modeloAuto: viaje.vehicleDetails || 'Modelo desconocido',
      fechaPedido: new Date().toLocaleDateString(),
      estado: 'Completado',
      price: viaje.costPerPassenger * (viaje.availableSeats || 1),
      rating: [1, 1, 1, 1, 1], // Ejemplo de calificación
    });


    // Redirige a la página de confirmación de compra
    this.router.navigate(['/confirmar-compra'], { state: { viaje } });
  }
  

  goToInicio() {
    this.router.navigate(['tabs/inicio']);
  }
}
