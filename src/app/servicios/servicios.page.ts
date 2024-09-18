import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage {

  services = [
    { 
      id: '1', 
      title: 'Transporte Compartido', 
      description: 'Viaja con otros estudiantes', 
      price: '$10.000', 
      rating: [1, 1, 1, 1, 0] 
    },
    { 
      id: '2', 
      title: 'Servicio Premium', 
      description: 'Transporte directo a tu casa.', 
      price: '$15.000', 
      rating: [1, 1, 1, 1, 1] 
    },
    
  ];

  selectService(service: any) {
    console.log('Servicio seleccionado:', service);
  }

  goToInicio() {
    this.router.navigate(['tabs/inicio']); 
  }

  filteredServices = [...this.services];
  searchTerm: string = '';
  selectedCategory: string = 'all';

  filterServices() {
    this.filteredServices = this.services.filter(service => {
      const matchesCategory = this.selectedCategory === 'all' || service.title.toLowerCase().includes(this.selectedCategory.toLowerCase());
      const matchesSearchTerm = service.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || service.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  }

  viewDetails(service: any) {
    console.log('Viewing details for:', service);
    
  }

  constructor(private router: Router) { 
    
  }

  

}
