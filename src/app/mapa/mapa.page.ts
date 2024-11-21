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

    // Puntos de inicio y final en Santiago, Chile
    this.setPoint(-33.4372, -70.6506, true); // Plaza de Armas
    this.setPoint(-33.4569, -70.6828, false); // Estación Central
    this.calculateRoute([-70.6506, -33.4372], [-70.6828, -33.4569]); // Coordenadas de inicio y final
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.6506, -33.4372], // Centrar en Plaza de Armas
      zoom: 12, // Ajustar nivel de zoom para Santiago
      accessToken: environment.mapboxApiKey,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
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

    // Crear la ruta en el mapa
    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
        properties: {}, // Añadir una propiedad vacía
      },
    });

    // Añadir la capa para dibujar la ruta
    this.map.addLayer({
      id: 'route-layer',
      type: 'line',
      source: 'route',
      paint: {
        'line-color': '#ff0000',
        'line-width': 4,
      },
    });

    // Centrar el mapa en el primer punto de la ruta
    const [startLng, startLat] = route[0];
    this.map.flyTo({
      center: [startLng, startLat],
      zoom: 14,
    });
  }

  animateVehicle(route: [number, number][]) {
    if (!route || route.length < 2) {
      console.error('La ruta no tiene suficientes puntos para animar.');
      return;
    }

    let index = 0;
    const animationSpeed = 1000; // Milisegundos entre movimientos

    // Crear el marcador del vehículo
    if (!this.vehicleMarker) {
      const vehicleIcon = 'assets/img/car-mapa.png'; // Ruta del ícono
      this.vehicleMarker = new mapboxgl.Marker({
        element: this.createVehicleIcon(vehicleIcon),
      })
        .setLngLat(route[0]) // Comienza en el primer punto de la ruta
        .addTo(this.map);
    }

    const moveMarker = () => {
      if (index < route.length) {
        this.vehicleMarker.setLngLat(route[index]);
        this.map.flyTo({ center: route[index], zoom: 14 }); // Actualizar vista con el vehículo
        index++;
        setTimeout(moveMarker, animationSpeed);
      } else {
        console.log('El vehículo llegó al destino.');
      }
    };

    moveMarker();
  }

  createVehicleIcon(iconUrl: string) {
    const img = document.createElement('img');
    img.src = iconUrl; // Ruta del ícono
    img.style.width = '50px'; // Tamaño del ícono
    img.style.height = '50px';
    img.style.transform = 'translate(-50%, -50%)'; // Centrar
    return img;
  }
}
