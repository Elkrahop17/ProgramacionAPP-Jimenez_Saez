import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit{
  userEmail: string | null = null; 
  profileImage: string | null = null;
  isModalOpen = false;
  isAppearanceModalOpen = false;
  isSecurityModalOpen = false;
  isContactsModalOpen = false;
  contacts: any[] = []
  
  constructor(private router: Router,  private authService: AuthService) { 
  }

  ngOnInit() {
    this.loadUserEmail(); // Cargar el correo del usuario al iniciar la página
    this.loadProfileImage();
  }

  async loadUserEmail() {
    this.userEmail = await this.authService.getUserEmail(); // Obtener el correo del usuario logueado
  }

   // Cargar la imagen de perfil si está disponible
  async loadProfileImage() {
    this.profileImage = await this.authService.getProfileImage();
  }

  goToProfile(){
    this.router.navigate(['tabs/perfil']);
  }

  //Sección de editar información
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveChanges() {
    this.closeModal();
  }

  //Sección de aparencia
  openAppearanceModal() {
    this.isAppearanceModalOpen = true;
  }

  closeAppearanceModal() {
    this.isAppearanceModalOpen = false;
  }

  saveAppearanceChanges() {
    this.closeAppearanceModal();
  }

  //Sección de seguridad
  openSecurityModal() {
    this.isSecurityModalOpen = true;
  }

  closeSecurityModal() {
    this.isSecurityModalOpen = false;
  }

  saveSecurityChanges() {
    this.closeSecurityModal();
  }

  //Sección de contacto
  openContactsModal() {
    this.isContactsModalOpen = true;
  }

  closeContactsModal() {
    this.isContactsModalOpen = false;
  }

  addContact() {
    // Lógica para añadir un contacto
    const name = (document.querySelector('ion-input[name="name"]') as HTMLInputElement).value;
    const phone = (document.querySelector('ion-input[name="phone"]') as HTMLInputElement).value;
    const email = (document.querySelector('ion-input[name="email"]') as HTMLInputElement).value;

    if (name && phone && email) {
      this.contacts.push({ name, phone, email });
    }
  }

  logout() {
    
    this.router.navigate(['/home']);
  }

}
