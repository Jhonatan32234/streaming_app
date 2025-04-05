import axios from 'axios';
import Dexie from 'dexie';

class VideoDB extends Dexie {
  videos;
  
  constructor() {
    super('VideoDB');
    this.version(1).stores({
      videos: 'id, blob, title'
    });
    this.videos = this.table('videos');
  }
}

const db = new VideoDB();

export const videoService = {
  fetchAllVideos: async () => {
    try {
      const response = await axios.get('http://backend:8080/videos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchVideo: async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/video/${id}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  saveVideo: async (id, blob, title) => {
    await db.videos.put({ id, blob, title });
  },

  getVideo: async (id) => {
    const video = await db.videos.get(id);
    return video ? video.blob : null;
  },

  getAllStoredVideos: async () => {
    return await db.videos.toArray();
  },

  deleteVideo: async (id) => {
    await db.videos.delete(id);
  }
};