import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isModalOpen = false;
  nombre_usuario: string | undefined; // Cambiar a undefined para manejar el valor inicial
  password: string = '';
  lugar_origen: string; 
  profileImage: string | ArrayBuffer | null = null;
  ocupacion: string;
  experiencia: string;
  correo: string;
  stats: { feed: number; followers: number; following: number };

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.lugar_origen = 'Santiago'; 
    this.ocupacion = '';
    this.experiencia = '';
    this.correo = '';
    this.stats = {
      feed: 115,
      followers: 2703,
      following: 1506,
    };
  }

  ngOnInit() {
    this.loadUserData(); // Cargar los datos del usuario al iniciar
    this.loadProfileImage();
  }

  async loadUserData() {
    // Obtener el primer nombre del usuario actual
    this.nombre_usuario = await this.authService.getCurrentUserFirstName();
  }

  async loadProfileImage() {
    this.profileImage = await this.authService.getProfileImage();
  }

  // Método para manejar la selección de archivos
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          this.profileImage = e.target.result as string;
          await this.authService.setProfileImage(this.profileImage); // Guardar la imagen en el servicio
        }
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      this.profileImage = null;
    }
  }


   // Método para abrir el modal
  openEditModal() {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  dismissModal() {
    this.isModalOpen = false;
  }

  async saveInformation() {
    // Lógica para guardar la información
    this.dismissModal(); // Cerrar el modal después de guardar
  }

  // Variables para manejar los modales
  isEditPersonalModalOpen = false; // Para el modal de edición de datos personales
  isOtherModalOpen = false; // Mantén esta si ya tienes otro modal para ocupación y experiencia

  // Métodos para el modal de edición de información personal
  openEditPersonalModal() {
    this.isEditPersonalModalOpen = true;
  }

  closeEditPersonalModal() {
    this.isEditPersonalModalOpen = false;
  }

  async savePersonalInformation() {
    if (!this.nombre_usuario || !this.correo || !this.password) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor completa todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Guardar la información actualizada (implementa tu lógica aquí)
    console.log('Datos personales actualizados:', {
      nombre_usuario: this.nombre_usuario,
      correo: this.correo,
      password: this.password,
    });

    // Cierra el modal después de guardar
    this.closeEditPersonalModal();
  }
  

  goToInicio() {
    this.router.navigate(['tabs/inicio']); 
  }

  goToConfiguracion() {
    this.router.navigate(['configuracion']);
  }

  goToActividad() {
    this.router.navigate(['tabs/actividad']); 
  }
  
  goToPago() {
    this.router.navigate(['pago']);
  }
  
  goToAyuda() {
    this.router.navigate(['ayuda']);
  }
}
