import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { ViajesService } from '../servicios/viajes.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage implements OnInit, OnDestroy {
  viaje: any;
  pasos: string[] = [
    'Recibido',
    'En camino a recogerte',
    'Recogida completada',
    'En camino a destino',
    'Llegada a destino'
  ];
  pasoActual: number = 0;
  progreso: number = 0;
  progresoSubscription: any = null;

  constructor(
    private router: Router,
    private viajesService: ViajesService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando datos del viaje...',
      spinner: 'crescent',
    });
    await loading.present();

    // Cargar datos del viaje
    this.viaje = await this.viajesService.getViajeActual();
    loading.dismiss();

    // Inicia la simulación de progreso
    this.simularProgreso();
  }

  goBack() {
    this.router.navigate(['tabs/servicio']);
  }

  async confirmarCancelacion() {
    const alert = await this.alertController.create({
      header: 'Cancelar viaje',
      message: '¿Estás seguro de que deseas cancelar el viaje?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancelación abortada');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.cancelarViaje();
          }
        }
      ]
    });
    await alert.present();
  }

  cancelarViaje() {
    console.log('Viaje cancelado');
    // Redirigir a la página de servicio o mostrar otro mensaje de confirmación
    this.router.navigate(['tabs/servicio']);
  }

  simularProgreso() {
    // Usar interval para actualizar el progreso
    this.progresoSubscription = interval(3000).subscribe(() => {
      if (this.pasoActual < this.pasos.length - 1) {
        this.pasoActual++;
        this.progreso = this.pasoActual / (this.pasos.length - 1);
      } else {
        this.progresoSubscription.unsubscribe(); // Detener cuando se complete el progreso
      }
    });
  }

  ngOnDestroy() {
    // Cancelar la subscripción si la página se destruye
    if (this.progresoSubscription) {
      this.progresoSubscription.unsubscribe();
    }
  }

  irAlMapa() {
    this.router.navigate(['/mapa']);  
  }
}
