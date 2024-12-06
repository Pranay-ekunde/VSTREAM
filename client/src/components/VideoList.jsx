
import ReactPlayer from 'react-player'
import React, { useEffect, useState } from 'react';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/videos');
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setVideos(data);
                } else {
                    throw new Error('API response is not an array');
                }
            } catch (err) {
                console.error('Error fetching videos:', err);
                setError('Error loading videos. Please try again later.');
            }
        };

        fetchVideos();
    }, [videos]); 

    const deleteVideo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/videos/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete video');

            alert('Video deleted successfully');
            setVideos(videos.filter(video => video._id !== id));
        } catch (err) {
            console.error('Error deleting video:', err);
            alert('Error deleting video. Please try again.');
        }
    };

    const showUpdateForm = (id, title, url) => {
        const updatedTitle = prompt('Enter new title:', title) || title;
        const updatedUrl = prompt('Enter new URL:', url) || url;

        const updateVideo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/videos/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: updatedTitle, url: updatedUrl }),
                });

                if (!response.ok) throw new Error('Failed to update video');

                alert('Video updated successfully');
                setVideos(videos.map(video => video._id === id ? { ...video, title: updatedTitle, url: updatedUrl } : video));
            } catch (err) {
                console.error('Error updating video:', err);
                alert('Error updating video. Please try again.');
            }
        };

        updateVideo();
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search videos"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            {error && <p>{error}</p>}
            {filteredVideos.length === 0 && !error ? (
                <p>No videos available.</p>
            ) : (
                filteredVideos.map(video => (
                    <div key={video._id}>
                        <h2>{video.title}</h2>
                         <ReactPlayer url={video.url} />
                        <button class ="init" onClick={() => deleteVideo(video._id)}>Delete</button>
                        <button class ="init" onClick={() => showUpdateForm(video._id, video.title, video.url)}>Update</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default VideoList;
