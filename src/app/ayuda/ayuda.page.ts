import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage {
  constructor(private alertController: AlertController, private router: Router,) {}

  async contactSupport() {
    const alert = await this.alertController.create({
      header: 'Contactar Soporte',
      message: 'Puedes escribirnos a soporte@tellevoapp.com o llamarnos al +56 9 231 144 22.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  goToProfile() {
    this.router.navigate(['tabs/perfil']); 
  }
}
