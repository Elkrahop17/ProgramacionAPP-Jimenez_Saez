import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage {
  email: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService
  ) {}

  async cambiarContrasena(event: Event) {
    event.preventDefault();

    if (!this.email || !this.nuevaContrasena || !this.confirmarContrasena) {
      const alert = await this.alertController.create({
        header: 'Campos Vacíos',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (this.nuevaContrasena === this.confirmarContrasena) {
      try {
        const user = await this.authService.getUserByEmail(this.email);
        if (user) {
          user.password = this.nuevaContrasena;
          await this.authService.updateUser(user);

          const alert = await this.alertController.create({
            header: 'Contraseña Cambiada',
            message: 'Tu contraseña ha sido cambiada exitosamente.',
            buttons: ['OK'],
          });
          await alert.present();

          // Redirigir al login
          this.router.navigate(['/home']);
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se encontró ninguna cuenta con ese correo.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden. Por favor, intenta de nuevo.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  GoToBack() {
    this.router.navigate(['/home']);
  }
}
