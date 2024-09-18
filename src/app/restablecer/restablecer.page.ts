import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage {
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';

  constructor(private alertController: AlertController, private router: Router) {}

  async cambiarContrasena(event: Event) {
    event.preventDefault();

    if (!this.nuevaContrasena || !this.confirmarContrasena) {
      const alert = await this.alertController.create({
        header: 'Campos Vacíos',
        message: 'Por favor, completa ambos campos de contraseña.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.nuevaContrasena === this.confirmarContrasena) {
      // Guarda la nueva contraseña en localStorage
      localStorage.setItem('password', this.nuevaContrasena);

      const alert = await this.alertController.create({
        header: 'Contraseña Cambiada',
        message: 'Tu contraseña ha sido cambiada exitosamente.',
        buttons: ['OK']
      });
      await alert.present();

      // Redirige al login
      this.router.navigate(['/home']);
      
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden. Por favor, intenta de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  GoToBack() {
    this.router.navigate(['/home']);
  }
}
