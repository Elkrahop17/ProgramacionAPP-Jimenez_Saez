import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage{

  goToInicio() {
    this.router.navigate(['tabs/inicio']); 
  }

  constructor(private router: Router) { }

}
