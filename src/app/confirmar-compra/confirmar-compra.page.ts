import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.page.html',
  styleUrls: ['./confirmar-compra.page.scss'],
})
export class ConfirmarCompraPage {
  viaje: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.viaje = navigation.extras.state['viaje']; // Usar corchetes para acceder a la propiedad
    }
  }

  confirmarCompra() {
    console.log('Compra confirmada para el viaje:', this.viaje);
    this.router.navigate(['/metodo-pago']);
  }

  goBack() {
    this.router.navigate(['tabs/servicio']);
  }
}
