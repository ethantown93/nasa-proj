import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {


  constructor(private api: ApiService) { }

  photoData: any;
  photoInformation = {
    href: '',
    title: '',
    description: '',
    date_created: '',
    nasaId: ''
  }

  ngOnInit() {

  }

  onSubmit(value){
    this.api.getPhotoData(value.photoQuery).subscribe( res => {
      console.log(res)
      let item:any = res;
      this.photoData = item.collection

    })  
  }

  photoInfo(href, title, date_created, description, nasaId){
    this.photoInformation.href = href;
    this.photoInformation.title = title;
    this.photoInformation.description = description;
    this.photoInformation.date_created = date_created;
    this.photoInformation.nasaId = nasaId;

    console.log(this.photoInformation.href)

  }

}
