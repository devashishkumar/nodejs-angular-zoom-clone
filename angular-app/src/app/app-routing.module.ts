import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoomvideoComponent } from './zoomvideo/zoomvideo.component';

const routes: Routes = [
  { path: 'chat/:id', component: ZoomvideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
