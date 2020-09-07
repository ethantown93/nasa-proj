import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-event-tracker',
  templateUrl: './event-tracker.component.html',
  styleUrls: ['./event-tracker.component.css']
})
export class EventTrackerComponent implements OnInit {

  events: any;
  latitude: number;
  longitude: number;


  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 31.9686;
  lng = -99.9018;
  dataLoaded: boolean = false;

  source: any;
  markers: any = [];
  geojson: any = {
    type: 'FeatureCollection',
    features: []
  }

  constructor(private api: ApiService) { }

  ngOnInit() {
    
    // mapboxgl.accessToken = environment.mapbox.accessToken
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(`${environment.mapbox.accessToken}`);

    this.api.getEventData().subscribe( response => {
      this.events = response;
      this.events.events.forEach(geo => {
        geo.geometries.forEach( el => {
          if(!isNullOrUndefined(el.coordinates[0])){
            this.longitude = el.coordinates[0]
          }
          if(!isNullOrUndefined(el.coordinates[1])){
            this.latitude = el.coordinates[1]
          }

          this.geojson.features.push(
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [this.longitude, this.latitude]
              },
              properties: {
                title: geo.title,
                description: geo.link,
                date: geo.geometries[0].date
              }
            },
          );
          this.markers.push(el);
        })
      })
      setTimeout(() => {
        this.buildMap()
        this.map.addControl(new mapboxgl.NavigationControl());
        this.markers = this.geojson;
      }, 1000)
    });
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 2,
      center: [this.lng, this.lat]
    });

    this.geojson.features.forEach((marker) => {
      let el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = "url(/../assets/images/mapbox-icon.png";
      el.style.height = "20px";
      el.style.width = "20px";
      el.style.borderRadius = "50%";
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = 'center'
      el.style.cursor = 'pointer'

      new mapboxgl.Marker(el)
      
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({
          offset: 15
        }) // add popups
          .setHTML('<h3>' + marker.properties.title + '</h3>' +
            '<p>' + 'Date: ' + marker.properties.date + '</p>'))
        .addTo(this.map);
    })
  }

  getGoogleLocation(value){

    // let coordinates;

    // let shit = this.events.events.forEach(element => {
    //   if(value === element.id){
    //         element.geometries.forEach( el => {
    //         coordinates = el.coordinates
    //       })
    //   } else {
    //     console.log('rip')
    //   }
    // });

    // this.longitude = coordinates[0]
    // this.latitude = coordinates[1]
    // console.log(this.latitude, this.longitude)
  }

}
