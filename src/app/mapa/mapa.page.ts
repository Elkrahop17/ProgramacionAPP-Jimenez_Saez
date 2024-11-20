import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements AfterViewInit {
  map!: mapboxgl.Map;
  startMarker!: mapboxgl.Marker;
  endMarker!: mapboxgl.Marker;
  vehicleMarker!: mapboxgl.Marker;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['tabs/servicio']);
  }

  ngAfterViewInit(): void {
    this.initializeMap();

    // Establecer los puntos de inicio y final y calcular la ruta
    this.setPoint(40.7128, -74.0060, true); // Punto de inicio (Times Square, Nueva York)
    this.setPoint(40.73061, -73.935242, false); // Punto final (Brooklyn, Nueva York)
    this.calculateRoute([-74.0060, 40.7128], [-73.935242, 40.73061]); // Coordenadas de inicio y final
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor HTML
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-74.5, 40], // Coordenadas iniciales
      zoom: 9, // Nivel de zoom
      accessToken: environment.mapboxApiKey, // Token de acceso
    });

    this.map.addControl(new mapboxgl.NavigationControl()); // Controles de navegación
  }

  setPoint(lat: number, lng: number, isStart: boolean) {
    const coords: [number, number] = [lng, lat];
    if (isStart) {
      if (this.startMarker) this.startMarker.remove();
      this.startMarker = new mapboxgl.Marker({ color: 'green' })
        .setLngLat(coords)
        .addTo(this.map);
    } else {
      if (this.endMarker) this.endMarker.remove();
      this.endMarker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(coords)
        .addTo(this.map);
    }
  }

  async calculateRoute(start: [number, number], end: [number, number]) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?geometries=geojson&access_token=${environment.mapboxApiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const route = data.routes[0].geometry.coordinates;

      if (route.length < 2) {
        console.error('La ruta generada no tiene suficientes puntos.');
        return;
      }

      this.drawRoute(route);
      this.animateVehicle(route); // Mover el vehículo a lo largo de la ruta
    } catch (error) {
      console.error('Error al calcular la ruta:', error);
    }
  }

  drawRoute(route: [number, number][]) {
    if (!route || route.length < 2) {
      console.error('La ruta no tiene suficientes puntos.');
      return;
    }

    // Crear la ruta en el mapa, asegurando que la propiedad 'properties' esté presente
    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
        properties: {} // Añadir una propiedad vacía
      },
    });

    // Añadir la capa para dibujar la ruta
    this.map.addLayer({
      id: 'route-layer',
      type: 'line',
      source: 'route',
      paint: {
        'line-color': '#ff0000', // Color de la ruta
        'line-width': 4, // Grosor de la línea
      },
    });

    // Centrar el mapa en el punto de inicio (primer punto de la ruta)
    const [startLng, startLat] = route[0];
    this.map.flyTo({
      center: [startLng, startLat], // Centrar en el primer punto
      zoom: 14, // Ajustar el nivel de zoom (ajustable)
    });
  }

  animateVehicle(route: [number, number][]) {
    if (!route || route.length < 2) {
      console.error('La ruta no tiene suficientes puntos para animar.');
      return;
    }
  
    let index = 0;
    const animationSpeed = 1500; // Milisegundos entre movimientos (ajustable)
  
    // Crear el marcador del vehículo si no existe
    if (!this.vehicleMarker) {
      const vehicleIcon = 'assets/img/car-mapa.png'; // URL de tu ícono
      this.vehicleMarker = new mapboxgl.Marker({
        element: this.createVehicleIcon(vehicleIcon),
      })
        .setLngLat(route[0]) // Comienza en el primer punto de la ruta
        .addTo(this.map);
    }
  
    const moveMarker = () => {
      if (index < route.length) {
        // Actualizar la posición del marcador
        this.vehicleMarker.setLngLat(route[index]);
  
        // Centrar el mapa en la nueva posición del vehículo
        this.map.flyTo({
          center: route[index], // Centrar en la nueva posición del vehículo
          zoom: 14, // Puedes ajustar el zoom si lo deseas
          speed: 0.8, // Ajustar la velocidad del movimiento del mapa
          curve: 1, // Hacer que el movimiento sea más suave
        });
  
        // Incrementar el índice para avanzar a la siguiente posición de la ruta
        index++;
  
        // Llamar a la siguiente animación después de un retraso
        setTimeout(moveMarker, animationSpeed);
      } else {
        console.log('El vehículo llegó al destino.');
      }
    };
  
    // Comenzar la animación
    moveMarker();
  }
  

  // Crear el ícono personalizado del vehículo
  createVehicleIcon(iconUrl: string) {
    const img = document.createElement('img');
    img.src = iconUrl; // Usar la ruta correcta aquí
    img.style.width = '30px'; // Ajusta el tamaño del ícono según sea necesario
    img.style.height = '30px';
    img.style.transform = 'translate(-50%, -50%)'; // Centrar el ícono
    return img;
  }
}
