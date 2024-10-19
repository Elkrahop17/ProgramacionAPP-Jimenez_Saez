import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  address: string = '';
  nombre_usuario: string = 'Miguel';

  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/tabs/perfil']);
  }

   // Método para redirigir a la página de "Ofrecer Vehículo"
  ofrecerViaje() {
    this.router.navigate(['/ofrecer-vehiculo']);
  }

  // Método para redirigir a la página de "Buscar Transporte"
  buscarTransporte() {
    this.router.navigate(['/tabs/servicio']);
  }
}
