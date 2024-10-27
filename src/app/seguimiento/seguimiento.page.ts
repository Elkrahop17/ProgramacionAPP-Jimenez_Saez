
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from '../servicios/viajes.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage implements OnInit {
  viaje: any; // Propiedad para almacenar los datos del viaje actual
  pasos: string[] = [
    'Recibido',
    'En camino a recogerte',
    'Recogida completada',
    'En camino a destino',
    'Llegada a destino'
  ];
  pasoActual: number = 0;
  progreso: number = 0;

  constructor(private router: Router, private viajesService: ViajesService) {}

  ngOnInit() {
    // Obtiene el viaje actual desde el servicio
    this.viaje = this.viajesService.getViajeActual();
    this.simularProgreso();
  }

  goBack() {
    this.router.navigate(['tabs/servicio']);
  }

  simularProgreso() {
    // Simula la actualización del progreso cada 3 segundos
    const intervalo = setInterval(() => {
      if (this.pasoActual < this.pasos.length - 1) {
        this.pasoActual++;
        this.progreso = this.pasoActual / (this.pasos.length - 1);
      } else {
        clearInterval(intervalo);
      }
    }, 3000);
  }
}
