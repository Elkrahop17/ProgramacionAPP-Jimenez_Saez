import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  address: string = '';
  nombre_usuario: string = '';
  weatherData: any; 
  apiKey: string = 'd6d640ef348e9de8f0dd7196c6724a3f'; 
  weatherIcon: string = 'sunny-outline';  

  constructor(private router: Router, private storage: Storage, private http: HttpClient) {
    this.loadUser();
    this.getWeatherData(); // Llamada a la API para obtener los datos del clima
  }

  async loadUser() {
    await this.storage.create();  
    this.nombre_usuario = await this.storage.get('nombre_usuario') || 'Diego';
  }

  async saveUser() {
    await this.storage.set('nombre_usuario', this.nombre_usuario);  // Guarda el nombre de usuario
  }


  goToProfile() {
    this.router.navigate(['/tabs/perfil']);
  }

   // Método para redirigir a la página de "Ofrecer Vehículo"
  ofrecerViaje() {
    this.router.navigate(['/ofrecer-vehiculo']);
  }

  // Método para redirigir a la página de "Buscar Transporte"
  buscarTransporte() {
    this.router.navigate(['/tabs/servicio']);
  }

  // Método para obtener los datos del clima
  getWeatherData() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Santiago&units=metric&appid=${this.apiKey}`;

    this.http.get(url).subscribe(data => {
      this.weatherData = data;
      this.setWeatherIcon();
    }, error => {
      console.error('Error al obtener el clima:', error);
    });
  }

  // Método para asignar un ícono según el estado del clima
  setWeatherIcon() {
    const weatherMain = this.weatherData.weather[0].main.toLowerCase();
    switch (weatherMain) {
      case 'clear':
        this.weatherIcon = 'sunny-outline';
        break;
      case 'clouds':
        this.weatherIcon = 'cloud-outline';
        break;
      case 'rain':
        this.weatherIcon = 'rainy-outline';
        break;
      case 'snow':
        this.weatherIcon = 'snow-outline';
        break;
      case 'thunderstorm':
        this.weatherIcon = 'thunderstorm-outline';
        break;
      case 'drizzle':
        this.weatherIcon = 'rainy-outline';
        break;
      default:
        this.weatherIcon = 'partly-sunny-outline';
        break;
    }
  }


}
