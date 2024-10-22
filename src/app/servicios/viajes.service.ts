import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViajesService {
  private viajes: any[] = [];

  constructor() {}

  // Método para agregar un viaje
  agregarViaje(viaje: any) {
    this.viajes.push(viaje);
  }

  // Método para obtener todos los viajes
  obtenerViajes() {
    return this.viajes;
  }
}

