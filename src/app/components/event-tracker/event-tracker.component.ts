import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-event-tracker',
  templateUrl: './event-tracker.component.html',
  styleUrls: ['./event-tracker.component.css']
})
export class EventTrackerComponent implements OnInit {

  events: any;
  latitude: number;
  longitude: number;

  constructor(private api: ApiService) { }

  ngOnInit() {
    
    this.api.getEventData().subscribe( response => {
      this.events = response;
      console.log(response)
    });

  }

  getGoogleLocation(value){

    let coordinates;

    let shit = this.events.events.forEach(element => {
      if(value === element.id){
            element.geometries.forEach( el => {
            coordinates = el.coordinates
          })
      } else {
        console.log('rip')
      }
    });

    this.longitude = coordinates[0]
    this.latitude = coordinates[1]
    console.log(this.latitude, this.longitude)
  }

}
