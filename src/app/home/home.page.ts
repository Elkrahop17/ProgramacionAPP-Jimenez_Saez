import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string;
  password: string;
  constructor(private alertController: AlertController, private navCtrl: NavController) {
    this.username = "";
    this.password = "";
  }
  
  async loginUsuario(event:Event){
    event.preventDefault();

    // logica para verificar si las credenciales son correctas
    if (this.username === 'usuario' && this.password === 'contraseña') {
      await this.showAlert('Éxito', 'Inicio de sesión exitoso.', 1500);
      console.log("Inicio de sesión exitoso.");

      this.navCtrl.navigateForward('/inicio');
      
    } else {
      await this.showAlert('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.', 1500);
      console.log("Credenciales incorrectas.");
    }

  }


  // Método para manejar el restablecimiento de contraseña
  async resetPassword() {
    await this.showAlert('Restablecer Contraseña', 'Se ha enviado un enlace para restablecer la contraseña a tu correo.', 1500);
    console.log("Enlace de restablecimiento de contraseña enviado.");
  }

  //Metodo para mostrar una alerta
  async showAlert(header: string, message: string,  duration: number) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    // Muestra la alerta en pantalla
    await alert.present();

    // Cierra la alerta automáticamente después del tiempo especificado
    setTimeout(() => {
      alert.dismiss();
    }, duration);

  }

}
