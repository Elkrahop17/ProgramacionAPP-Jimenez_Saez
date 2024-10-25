import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
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
  showLogin: boolean = false; // El formulario de login inicia oculto

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService 
  ) {
    this.username = "";
    this.password = "";
  }

  ngOnInit() {
    // Mostrar el formulario de login después de 2 segundos
    setTimeout(() => {
      this.showLogin = true;
    }, 2000);
  }

  // Método para logear al usuario
  
  async loginUsuario(event: Event) {
    event.preventDefault();
  
    const storedUsers: User[] = await this.authService.getUsers(); // Especifica el tipo de storedUsers
    const loggedUser = storedUsers.find((user: User) => user.correo === this.username && user.password === this.password); // Especifica el tipo de user
  
    if (loggedUser) {
      await this.authService.setUserEmail(loggedUser.correo); // Guardar el correo del usuario logueado
      await this.showAlert('Éxito', 'Inicio de sesión exitoso.', 1500);
      this.router.navigate(['tabs/inicio']); // Redirigir a la página de inicio
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

  // Método para redirigir a la página de registro
  goToRegister() {
    this.router.navigate(['/crear-usuario']);
  }
}

