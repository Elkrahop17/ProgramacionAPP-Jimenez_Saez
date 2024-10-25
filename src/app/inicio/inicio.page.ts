import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

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
  private email: string = ''; // Aquí se almacenará el correo del usuario que inició sesión

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
    this.loadUser(); // Cargar el usuario al iniciar el componente
    this.getWeatherData(); // Llamada a la API para obtener los datos del clima
  }

  async loadUser() {
    this.email = await this.authService.getUserEmail(); // Obtener el correo del usuario que ha iniciado sesión
    const user = await this.authService.getUserByEmail(this.email); // Obtener el usuario por correo

    if (user) {
      this.nombre_usuario = `${user.firstName} ${user.lastName}`; // Asignar el nombre completo
    } else {
      this.nombre_usuario = 'Usuario'; // Nombre por defecto
    }
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
