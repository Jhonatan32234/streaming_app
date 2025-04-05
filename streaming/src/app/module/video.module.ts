import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './videoDashboard/video.component';

@NgModule({
  declarations: [
    VideoComponent // ✅ Declaramos el componente aquí
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VideoComponent // ✅ Lo exportamos para usarlo en otros módulos
  ]
})
export class VideoModule { }
