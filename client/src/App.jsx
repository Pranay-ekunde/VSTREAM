import React, { useState } from 'react';
import VideoList from './components/VideoList';
import VideoForm from './components/VideoFrom';
import axios from 'axios';

const App = () => {
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleEdit = (video) => {
    setCurrentVideo(video);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
    } catch (err) {
      console.error('Error deleting video:', err.message);
    }
  };

  const handleSuccess = () => {
    setCurrentVideo(null);
  };

  return (
    <div>
      <h1 data-text="VSTREAM">VSTREAM</h1>
      <VideoForm currentVideo={currentVideo} onSuccess={handleSuccess} />
      <VideoList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
