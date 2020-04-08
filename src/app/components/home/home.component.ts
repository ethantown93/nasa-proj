import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  key: any;
  containsYoutube: boolean = false;
  imageOfTheDay;

  ngOnInit() {

    this.imageOfTheDay = document.querySelector('penis');
    console.log(this.imageOfTheDay);

    this.http.get('../../assets/api-key.json').subscribe( res => {
      if(res) {
        this.key = res;
        console.log(res)
        this.getImageOfTheDay();
      } else {
        console.log('no response.')
      }
    })

  }


  getYoutubeUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.imageOfTheDay.url}`)
  }

  getImageOfTheDay(){
    this.http.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2020-01-07&end_date=2020-01-08&api_key=${this.key.apiKey}`)
    .subscribe( res => {
      console.log(res)
    })
    this.http.get(`https://api.nasa.gov/planetary/apod?api_key=${this.key.apiKey}`).subscribe( res => {
        if(res){
           this.imageOfTheDay = res;
           let url = 'youtube.com'
           if(this.imageOfTheDay.url.includes(url)) {
            this.containsYoutube = true;
           } else {
             this.containsYoutube = false;
           }

        }
      }
      
    )
  }

}
