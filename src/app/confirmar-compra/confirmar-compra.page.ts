import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.page.html',
  styleUrls: ['./confirmar-compra.page.scss'],
})
export class ConfirmarCompraPage {
  viaje: any;
  cargando = false;  // Estado para controlar el spinner

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.viaje = navigation.extras.state['viaje'];
    }
  }

  confirmarCompra() {
    // Activa el estado de carga
    this.cargando = true;

    // Simulación de espera de 3 segundos
    setTimeout(() => {
      console.log('Compra confirmada para el viaje:', this.viaje);
      this.cargando = false;
      this.router.navigate(['/metodo-pago']);
    }, 3000);
  }

  goBack() {
    this.router.navigate(['tabs/servicio']);
  }
}
