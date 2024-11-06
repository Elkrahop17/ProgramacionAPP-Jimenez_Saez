import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.page.html',
  styleUrls: ['./metodo-pago.page.scss'],
})
export class MetodoPagoPage {
  metodosPago = [
    { nombre: 'Tarjeta de Crédito/Débito', valor: 'tarjeta', icono: 'card-outline' },
    { nombre: 'PayPal', valor: 'paypal', icono: 'logo-paypal'  },
    { nombre: 'Transferencia Bancaria', valor: 'transferencia', icono: 'cash-outline'  }
  ];
  
  metodoSeleccionado: string = '';
  numeroTarjeta: string = '';
  fechaExpiracion: string = '';
  codigoSeguridad: string = '';
  correoPaypal: string = '';
  numeroCuenta: string = '';
  nombreBanco: string = '';

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/confirmar-compra']);
  }

  procesarPago() {
    // Verifica que se haya seleccionado un método de pago
    if (!this.metodoSeleccionado) {
      alert('Por favor, seleccione un método de pago.');
      return;
    }
  
    // Valida el método de pago seleccionado y los campos correspondientes
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
  
    alert('Compra realizada con éxito');
    this.router.navigate(['/seguimiento']);
  }


}

