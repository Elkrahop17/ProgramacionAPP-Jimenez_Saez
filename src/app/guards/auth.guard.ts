import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated();
    if (!isAuthenticated) {
      // Muestra alerta
      const alert = await this.alertController.create({
        header: 'Acceso Restringido',
        message: 'Debes iniciar sesión para acceder a esta página.',
        buttons: ['OK']
      });
      await alert.present();

      // Redirige al login
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}


