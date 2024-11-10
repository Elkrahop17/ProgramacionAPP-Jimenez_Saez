import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export interface User {
  firstName: string;
  lastName: string;
  correo: string;
  password: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string;
  password: string;
  showLogin: boolean = false;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController 
  ) {
    this.username = "";
    this.password = "";
  }

  ngOnInit() {
    setTimeout(() => {
      this.showLogin = true;
    }, 2000);
  }

  async loginUsuario(event: Event) {
    event.preventDefault();

    // Muestra el spinner de carga mientras se procesa el inicio de sesión
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent', // Estilo del spinner
    });
    await loading.present();

    const storedUsers: User[] = await this.authService.getUsers();
    const loggedUser = storedUsers.find((user: User) => user.correo === this.username && user.password === this.password);

    await loading.dismiss(); // Oculta el spinner una vez completada la autenticación

    if (loggedUser) {
      await this.authService.setUserEmail(loggedUser.correo);
      await this.showAlert('Éxito', 'Inicio de sesión exitoso.', 1500);
      this.router.navigate(['tabs/inicio']);
    } else {
      await this.showAlert('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.', 1500);
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

  goToRegister() {
    this.router.navigate(['/crear-usuario']);
  }
}
