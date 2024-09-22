import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage {
  selectedService: any = null;
  requester: string = '';
  date: string = '';
  
  carModel: string = '';
  pricePerPerson: number = 0;
  isModalOpen: boolean = false;

  services = [
    { id: '1', title: 'Transporte Compartido', description: 'Viaja con otros estudiantes', price: '$10.000', rating: [1, 1, 1, 1, 0] },
    { id: '2', title: 'Servicio Premium', description: 'Transporte directo a tu casa.', price: '$15.000', rating: [1, 1, 1, 1, 1] },
  ];

  selectService(service: any) {
    this.selectedService = service;
    this.openModal(); 

  }

  openModal() {
    this.isModalOpen = true;
    this.resetForm(); 
  }

  closeModal() {
    this.isModalOpen = false;
  }

  resetForm() {
    this.requester = '';
    this.date = '';
    this.carModel = '';
    this.pricePerPerson = 0;
  }

  submitService() {
    const data = {
      requester: this.requester,
      date: this.date,
      carModel: this.carModel,
      pricePerPerson: this.pricePerPerson,
    };
    console.log('Datos del servicio:', data);
    this.closeModal(); 
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

  constructor(private router: Router) {}

}



  

  


