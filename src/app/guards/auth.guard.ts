import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storage: Storage) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.storage.get('isAuthenticated');
    
    if (isAuthenticated) {
      return true;  // Permite acceso
    } else {
      this.router.navigate(['/login']);  // Redirige a login si no está autenticado
      return false;
    }
  }
}

