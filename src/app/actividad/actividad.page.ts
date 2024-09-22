import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage {

  // Datos de ejemplo para los pedidos
  pedidos = [
    { 
      title: 'Transporte Compartido', 
      nombreUsuario: 'Juan Pérez',  
      modeloAuto: 'Toyota Corolla', 
      fechaPedido: formatDate(new Date(), 'dd/MM/yyyy', 'en'), 
      estado: 'Completado', 
      price: '$10.000', 
      rating: [1, 1, 1, 1, 0] 
    },
    { 
      title: 'Servicio Premium', 
      nombreUsuario: 'Sofía González', 
      modeloAuto: 'Mercedes-Benz Clase C', 
      fechaPedido: formatDate(new Date(), 'dd/MM/yyyy', 'en'), 
      estado: 'Pendiente', 
      price: '$15.000', 
      rating: [1, 1, 1, 1, 1] 
    }
  ];

  // Navegar de vuelta a la página de inicio
  goToInicio() {
    this.router.navigate(['tabs/inicio']); 
  }

  constructor(private router: Router) { }

}

