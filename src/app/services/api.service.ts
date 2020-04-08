import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  getEventData(){
    return this.http.get('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?limit=100')
  }

  getPhotoData(query){
    return this.http.get(`https://images-api.nasa.gov/search?q=${query}`)
  }

}
