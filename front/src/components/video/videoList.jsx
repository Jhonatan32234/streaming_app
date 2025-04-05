import './Video.css';

export const VideoList = ({ videos, onVideoSelect }) => {
  return (
    <div className="video-list">
      <h3>Lista de Videos</h3>
      <ul>
        {videos.map(video => (
          <li 
            key={video.id} 
            onClick={() => onVideoSelect(video.id)} 
            className="video-item"
          >
            {video.title}
          </li>
        ))}
      </ul>
    </div>
  );
};