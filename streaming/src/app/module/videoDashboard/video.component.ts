import { Component, OnInit } from '@angular/core';
import { VideoService } from '../service/video.service';
import { Router } from '@angular/router';

interface Video {
  id: number;
  title: string;
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  videos: Video[] = [];
  selectedVideoUrl: string | null = null;
  selectedVideoId: number | null = null;

  constructor(private videoService: VideoService,private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Acceso no autorizado');
      this.router.navigate(['/login']);
    }
    // Primero, intentar obtener los videos desde la base de datos local (Dexie)
    const storedVideos = await this.videoService.getAllStoredVideos();
    
    if (storedVideos.length > 0) {
      // Si ya existen videos almacenados, cargarlos
      this.videos = storedVideos.map((video: any) => ({
        id: video.id,
        title: video.title,
      }));
    } else {
      // Si no hay videos almacenados, obtenerlos de la API
      this.videoService.fetchAllVideos().subscribe((videos) => {
        console.log("debe haber videos");
        
        this.videos = videos;
        // Guardar los videos recibidos en la base de datos local
        videos.forEach(async (video) => {
          const videoBlob = await this.videoService.fetchVideo(video.id).toPromise();
          
          // Verificar que videoBlob no es undefined antes de guardarlo
          if (videoBlob instanceof Blob) {
            await this.videoService.saveVideo(video.id, videoBlob, video.title);
          } else {
            console.error(`Error: El video con ID ${video.id} no es un Blob válido.`);
          }
        });
      });
    }
  }

  // Cargar y reproducir un video seleccionado
  async playVideo(id: number) {
    // Limpiar el video anterior
    this.selectedVideoUrl = null;

    // Cargar el video seleccionado
    const cachedVideo = await this.videoService.getVideo(id);
    if (cachedVideo) {
      console.log('Video cargado desde almacenamiento local');
      this.selectedVideoUrl = URL.createObjectURL(cachedVideo);
    } else {
      console.log('Cargando video desde la API');
      this.videoService.fetchVideo(id).subscribe(async (blob) => {
        if (blob instanceof Blob) {
          this.selectedVideoUrl = URL.createObjectURL(blob);
          // Guardar el video en la base de datos local después de descargarlo
          const title = this.videos.find((video) => video.id === id)?.title || 'Unknown';
          await this.videoService.saveVideo(id, blob, title);
        } else {
          console.error(`Error: El video con ID ${id} no es un Blob válido.`);
        }
      });
    }

    // Actualizar el ID del video seleccionado
    this.selectedVideoId = id;
  }

  // Eliminar el video seleccionado
  async deleteVideo(id: number) {
    await this.videoService.deleteVideo(id);
    console.log(`Video con ID ${id} eliminado`);
    this.selectedVideoUrl = null; // Limpiar la URL del video
    this.videos = this.videos.filter((video) => video.id !== id); // Eliminar de la lista
  }
}
