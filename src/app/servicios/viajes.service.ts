import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViajesService {
  private viajes: any[] = []; // Lista de viajes creados por los usuarios
  private viajeActual: any; // Almacena el viaje actual seleccionado

  // Método para agregar un nuevo viaje creado por el usuario
  agregarViaje(viaje: any) {
    // Aseguramos que cada viaje tenga un ID único
    viaje.id = Date.now(); // Usamos un ID único basado en la fecha
    this.viajes.push(viaje);
  }

  // Método para obtener todos los viajes, incluyendo los aleatorios
  obtenerViajes() {
    return [...this.viajes, ...this.generarViajesAleatorios()];
  }

  // Método para establecer el viaje actual
  setViajeActual(viaje: any) {
    this.viajeActual = viaje;
  }

  // Método para obtener el viaje actual
  getViajeActual() {
    return this.viajeActual;
  }

  // Método para actualizar un viaje, por ejemplo, cuando se marca como ocupado
  actualizarViaje(viajeActualizado: any) {
    const index = this.viajes.findIndex(viaje => viaje.id === viajeActualizado.id);

    if (index !== -1) {
      // Actualiza el viaje en la lista
      this.viajes[index] = viajeActualizado;
    }
  }

  // Método privado para generar viajes aleatorios
  private generarViajesAleatorios(): any[] {
    const nombresConductores = ['Juan Pérez', 'Ana López', 'Carlos Rivera', 'Laura Gómez'];
    const vehiculos = [
      'Ford Fiesta 2018, Rojo',
      'Hyundai Accent 2020, Azul',
      'Toyota Corolla 2019, Blanco',
      'Chevrolet Spark 2017, Verde',
    ];
    const ubicaciones = ['Centro Comercial', 'Estación de Tren', 'Universidad', 'Plaza Central'];
    const destinos = ['Aeropuerto', 'Museo', 'Parque Principal', 'Terminal de Buses'];

    const viajesAleatorios = [];

    // Genera 3 viajes aleatorios
    for (let i = 0; i < 3; i++) {
      const driverName = nombresConductores[Math.floor(Math.random() * nombresConductores.length)];
      const vehicleDetails = vehiculos[Math.floor(Math.random() * vehiculos.length)];
      const pickupLocation = ubicaciones[Math.floor(Math.random() * ubicaciones.length)];
      const destination = destinos[Math.floor(Math.random() * destinos.length)];
      const availableSeats = Math.floor(Math.random() * 3) + 1; // Entre 1 y 3 asientos
      const costPerPassenger = (Math.floor(Math.random() * 5) + 2) * 1000; // Entre 2000 y 7000

      viajesAleatorios.push({
        id: Date.now() + Math.random(), // Generamos un ID único
        driverName,
        vehicleDetails,
        pickupLocation,
        destination,
        availableSeats,
        costPerPassenger,
        isTaken: false, // Campo para verificar si el viaje está tomado
      });
    }

    return viajesAleatorios;
  }
}
