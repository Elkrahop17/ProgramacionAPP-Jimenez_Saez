import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string;
  password: string;

  constructor(private alertController: AlertController, private navCtrl: NavController, private router: Router) {
    this.username = "";
    this.password = "";
  }

  async loginUsuario(event: Event) {
    event.preventDefault();

    // Obtén la contraseña almacenada en localStorage
    const storedPassword = localStorage.getItem('password');
    
    // Verifica si las credenciales son correctas
    if (this.username === 'usuario' && this.password === storedPassword) {
      await this.showAlert('Éxito', 'Inicio de sesión exitoso.', 1500);
      console.log("Inicio de sesión exitoso.");

      this.navCtrl.navigateForward('/tabs/inicio');
      
    } else {
      await this.showAlert('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.', 1500);
      console.log("Credenciales incorrectas.");
    }
  }

  async resetPassword() {
    this.router.navigate(['/restablecer']);
  }

  async showAlert(header: string, message: string, duration: number) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, duration);
  }
}
