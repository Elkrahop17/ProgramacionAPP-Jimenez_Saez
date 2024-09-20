import { Component } from '@angular/core';

interface Pedido {
  id: number;
  modeloAuto: string;
  fechaPedido: string;
  estado: string;
}

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage {

  pedidos: Pedido[] = [
    { id: 1, modeloAuto: 'Toyota Corolla', fechaPedido: '2024-09-01', estado: 'Entregado' },
    { id: 2, modeloAuto: 'Honda Civic', fechaPedido: '2024-08-25', estado: 'En proceso' },
    { id: 3, modeloAuto: 'Ford Mustang', fechaPedido: '2024-08-15', estado: 'Cancelado' },
  ];

  goToInicio() {
    // Lógica para volver a la página de inicio
  }

}
