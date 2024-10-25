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
  

  goToInicio() {
    this.router.navigate(['tabs/inicio']); 
  }

  goToConfiguracion() {
    this.router.navigate(['configuracion']);
  }
}
