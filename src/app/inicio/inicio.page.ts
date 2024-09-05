import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  nombre_usuario: string;
  constructor(private router: Router) { 

    this.nombre_usuario = 'Miguel';
  }

  goToProfile() {
    this.router.navigate(['/tabs/perfil']);
  }
}
