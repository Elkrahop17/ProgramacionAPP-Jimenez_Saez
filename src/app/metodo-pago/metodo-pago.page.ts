import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.page.html',
  styleUrls: ['./metodo-pago.page.scss'],
})
export class MetodoPagoPage {
  metodosPago = [
    { nombre: 'Tarjeta de Crédito/Débito', valor: 'tarjeta' },
    { nombre: 'PayPal', valor: 'paypal' },
    { nombre: 'Transferencia Bancaria', valor: 'transferencia' }
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
    this.router.navigate(['/servicios']);
  }

  procesarPago() {
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

