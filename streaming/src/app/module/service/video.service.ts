import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private db: any;

  constructor(private http: HttpClient) {
    // Inicializar Dexie para la base de datos
    this.db = new Dexie('VideoDB');
    this.db.version(1).stores({ videos: 'id, blob, title' });
  }

  // Obtener todos los videos de la API
  fetchAllVideos(): Observable<any[]> {
    console.log("Obteniendo todos los videos de la API");
    return this.http.get<any[]>(`http://localhost:8080/videos`);
  }

  // Obtener un solo video usando su ID
  fetchVideo(id: number): Observable<Blob> {
    console.log("Llamando a la API para obtener un video");
    return this.http.get(`http://localhost:8080/video/${id}`, { responseType: 'blob' });
  }

  // Guardar un video en Dexie (Base de datos local)
  async saveVideo(id: number, blob: Blob, title: string) {
    await this.db.videos.put({ id, blob, title });
  }

  // Obtener un video desde Dexie
  async getVideo(id: number): Promise<Blob | null> {
    const video = await this.db.videos.get(id);
    return video ? video.blob : null;
  }

  // Obtener todos los videos almacenados en Dexie
  async getAllStoredVideos(): Promise<any[]> {
    return await this.db.videos.toArray();
  }

  // Eliminar un video de Dexie
  async deleteVideo(id: number) {
    await this.db.videos.delete(id);
  }
}
