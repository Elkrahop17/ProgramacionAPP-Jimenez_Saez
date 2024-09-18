import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  address: string = '';
  nombre_usuario: string;
  selectedCar: string | null = null
  constructor(private router: Router) { 
    
    this.nombre_usuario = 'Miguel';
  }


  // Método para seleccionar un coche
  selectCar(carId: string) {
    this.selectedCar = carId;
  }

  goToProfile() {
    this.router.navigate(['/tabs/perfil']);
  }
}
