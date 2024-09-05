import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  nombre_usuario: string;
  lugar_origen: string;
  stats: { feed: number; followers: number; following: number };

  constructor(private router: Router) { 
    this.nombre_usuario = 'Miguel Leyton'; 
    this.lugar_origen = 'Santiago'; 
    this.stats = {
      feed: 115,
      followers: 2703,
      following: 1506,
    };
  }

  goToInicio() {
    this.router.navigate(['tabs/inicio']); 
  }

  goToConfiguracion(){
    this.router.navigate(['configuracion'])
  }
}
