import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController 
  ) {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

  async registrar(event: Event) {
    if (this.firstName && this.lastName && this.email && this.password) {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        correo: this.email,
        password: this.password,
      };

      // Verificar si el correo ya existe
      const existingUser = await this.authService.getUserByEmail(this.email);
      if (existingUser) {
        // Mostrar una alerta si el correo ya está registrado
        await this.showAlert('Error', 'Este correo ya está registrado. Intenta con otro.');
      } else {
        try {
          // Guardar el usuario en Storage
          await this.authService.registerUser(user);
          // Redirigir al login después del registro
          this.router.navigate(['/home']);
        } catch (error: any) {
          console.log(error.message); // Muestra el mensaje de error
        }
      }
    } else {
      console.log('Por favor, completa todos los campos.');
    }
  }

  // Método para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/home']);
  }
}
