import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from '../servicios/viajes.service'; // Importa el servicio

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.page.html',
  styleUrls: ['./metodo-pago.page.scss'],
})
export class MetodoPagoPage {
  metodosPago = [
    { nombre: 'Tarjeta de Crédito/Débito', valor: 'tarjeta', icono: 'card-outline' },
    { nombre: 'PayPal', valor: 'paypal', icono: 'logo-paypal' },
    { nombre: 'Transferencia Bancaria', valor: 'transferencia', icono: 'cash-outline' }
  ];

  metodoSeleccionado: string = '';
  numeroTarjeta: string = '';
  fechaExpiracion: string = '';
  codigoSeguridad: string = '';
  correoPaypal: string = '';
  numeroCuenta: string = '';
  nombreBanco: string = '';
  cargando = false;

  constructor(private router: Router, private viajesService: ViajesService) {} // Inyecta el servicio

  goBack() {
    this.router.navigate(['/confirmar-compra']);
  }

  procesarPago() {
    if (!this.metodoSeleccionado) {
      alert('Por favor, seleccione un método de pago.');
      return;
    }

    if (this.metodoSeleccionado === 'tarjeta') {
      if (!this.numeroTarjeta || !this.fechaExpiracion || !this.codigoSeguridad) {
        alert('Por favor, complete todos los campos de la tarjeta.');
        return;
      }
    } else if (this.metodoSeleccionado === 'paypal') {
      if (!this.correoPaypal) {
        alert('Por favor, ingrese su correo de PayPal.');
        return;
      }
    } else if (this.metodoSeleccionado === 'transferencia') {
      if (!this.numeroCuenta || !this.nombreBanco) {
        alert('Por favor, complete todos los campos de transferencia bancaria.');
        return;
      }
    }

    this.cargando = true;
    setTimeout(() => {
      console.log('Pago procesado con éxito');
      this.cargando = false;
      alert('Compra realizada con éxito');

      // Paso los datos del viaje a la página de seguimiento
      const viajeActual = this.viajesService.getViajeActual(); // Obtén los datos del viaje actual
      this.router.navigate(['/seguimiento'], { state: { viaje: viajeActual } });
    }, 3000);
  }
}
