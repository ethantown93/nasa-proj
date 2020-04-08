import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventTrackerComponent } from './components/event-tracker/event-tracker.component';
import { HomeComponent } from './components/home/home.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'event-tracker',
    component: EventTrackerComponent
  },
  {
    path: 'photo-gallery',
    component: PhotoGalleryComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
