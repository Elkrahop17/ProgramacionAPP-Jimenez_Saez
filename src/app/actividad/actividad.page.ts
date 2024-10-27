import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from '../servicios/pedidos.service'; // Importa el servicio de pedidos

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {
  pedidos: any[] = []; // Array para almacenar los pedidos desde el servicio

  constructor(private router: Router, private pedidosService: PedidosService) {} // Inyecta el servicio de pedidos

  ngOnInit() {
    // Carga los pedidos almacenados en el servicio al iniciar la página
    this.pedidos = this.pedidosService.obtenerPedidos();
  }

  goToInicio() {
    this.router.navigate(['tabs/inicio']);
  }
}
