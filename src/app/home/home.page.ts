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
  showLogin: boolean = false; // El formulario de login inicia oculto

  constructor(private alertController: AlertController, private navCtrl: NavController, private router: Router) {
    this.username = "";
    this.password = "";
  }

  ngOnInit() {
    // Mostrar el formulario de login después de 5 segundos
    setTimeout(() => {
      this.showLogin = true;
    }, 2000);
  }

  async loginUsuario(event: Event) {
    event.preventDefault();

    const storedPassword = localStorage.getItem('password');
    
    if (this.username === 'di.jimeneze@duocuc.cl' && this.password === storedPassword) {
      await this.showAlert('Éxito', 'Inicio de sesión exitoso.', 1500);
      console.log("Inicio de sesión exitoso.");
      this.router.navigate(['tabs/inicio']);
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
