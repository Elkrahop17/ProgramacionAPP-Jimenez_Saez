
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private pedidos: any[] = []; // Arreglo para almacenar pedidos

  // Método para agregar un nuevo pedido
  agregarPedido(pedido: any) {
    this.pedidos.push(pedido);
  }

  // Método para obtener todos los pedidos
  obtenerPedidos() {
    return this.pedidos;
  }
}
