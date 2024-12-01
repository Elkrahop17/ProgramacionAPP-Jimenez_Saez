import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage {
  constructor(private alertController: AlertController, private router: Router,) {}

  async selectPaymentMethod(method: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Método de Pago',
      message: `¿Estás seguro de que deseas usar ${method}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.completePayment(method);
          },
        },
      ],
    });

    await alert.present();
  }

  async completePayment(method: string) {
    const alert = await this.alertController.create({
      header: 'Pago Completado',
      message: `Has seleccionado ${method} como tu método de pago.`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  goToProfile() {
    this.router.navigate(['tabs/perfil']); 
  }
}

