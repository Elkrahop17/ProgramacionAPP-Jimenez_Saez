import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage{

  constructor(private router: Router) { }

  goToProfile(){
    this.router.navigate(['/profile']);
  }

  goToUserDetails(){
    this.router.navigate(['/datosExtras'])
  }

}
