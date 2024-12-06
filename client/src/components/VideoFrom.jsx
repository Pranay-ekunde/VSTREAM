import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoForm = ({ currentVideo, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (currentVideo) {
      setTitle(currentVideo.title);
      setUrl(currentVideo.url);
    } else {
      setTitle('');
      setUrl('');
    }
  }, [currentVideo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentVideo) {
        // Update video
        await axios.put(`http://localhost:5000/api/videos/${currentVideo._id}`, { title, url });
      } else {
        // Add video
        axios.post('http://localhost:5000/api/videos', { title, url });
      }
      setTitle('');
      setUrl('');
      onSuccess();
    } catch (err) {
      console.error('Error saving video:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 >{currentVideo ? 'Edit Video' : 'Add Video'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit">{currentVideo ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default VideoForm;
