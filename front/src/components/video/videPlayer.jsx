import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { videoService } from '../../services/video.service';
import { VideoList } from './videoList';
import './Video.css';

export const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Acceso no autorizado');
      navigate('/login');
      return;
    }

    const loadVideos = async () => {
      try {
        // Primero intentar cargar videos almacenados localmente
        const storedVideos = await videoService.getAllStoredVideos();
        
        if (storedVideos.length > 0) {
          setVideos(storedVideos.map(video => ({
            id: video.id,
            title: video.title
          })));
        } else {
          // Si no hay videos locales, cargar desde la API
          const apiVideos = await videoService.fetchAllVideos();
          setVideos(apiVideos);
          
          // Guardar los videos en IndexedDB
          for (const video of apiVideos) {
            try {
              const videoBlob = await videoService.fetchVideo(video.id);
              await videoService.saveVideo(video.id, videoBlob, video.title);
            } catch (error) {
              console.error(`Error al guardar video ${video.id}:`, error);
            }
          }
        }
      } catch (error) {
        console.error('Error al cargar videos:', error);
      }
    };

    loadVideos();
  }, [navigate]);

  const playVideo = async (id) => {
    setSelectedVideoUrl(null);
    
    try {
      // Primero intentar cargar desde caché
      const cachedVideo = await videoService.getVideo(id);
      if (cachedVideo) {
        console.log('Video cargado desde almacenamiento local');
        setSelectedVideoUrl(URL.createObjectURL(cachedVideo));
        setSelectedVideoId(id);
        return;
      }
      
      // Si no está en caché, cargar desde la API
      console.log('Cargando video desde la API');
      const blob = await videoService.fetchVideo(id);
      setSelectedVideoUrl(URL.createObjectURL(blob));
      setSelectedVideoId(id);
      
      // Guardar en IndexedDB para futuras visitas
      const title = videos.find(v => v.id === id)?.title || 'Unknown';
      await videoService.saveVideo(id, blob, title);
    } catch (error) {
      console.error('Error al cargar video:', error);
    }
  };

  const deleteVideo = async (id) => {
    await videoService.deleteVideo(id);
    console.log(`Video con ID ${id} eliminado`);
    setSelectedVideoUrl(null);
    setVideos(videos.filter(video => video.id !== id));
  };

  return (
    <div className="video-container">
      <div className="video-player">
        <h2>{selectedVideoId && `Reproduciendo Video ID: ${selectedVideoId}`}</h2>
        {selectedVideoUrl ? (
          <video className="videocont" controls width="640">
            <source src={selectedVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <p>Selecciona un video para reproducir</p>
        )}
        <br />
        {selectedVideoId && (
          <button 
            onClick={() => deleteVideo(selectedVideoId)} 
            className="btn delete-btn"
          >
            Eliminar Video
          </button>
        )}
      </div>

      <VideoList videos={videos} onVideoSelect={playVideo} />
    </div>
  );
};