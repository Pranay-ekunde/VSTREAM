//DreamStream\backend\controllers\videoController.js
const Video = require('../models/Video');

// Controller to fetch videos
exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        if (!videos || videos.length === 0) {
            return res.status(200).json({ message: 'No videos found' });  // Add this check
        }
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Controller to add a new video
exports.addVideo = async (req, res) => {
    try {
        const { title, url } = req.body;

        // Validate input
        if (!title || !url) {
            return res.status(400).json({ error: 'Title and URL are required' });
        }

        // Create and save the new video
        const newVideo = new Video({ title, url });
        await newVideo.save();

        res.status(201).json(newVideo); // Return the newly created video
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a video by ID
exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findByIdAndDelete(id);

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json({ message: 'Video deleted successfully', video });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a video by ID
exports.updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, url } = req.body;

        const updatedVideo = await Video.findByIdAndUpdate(
            id,
            { title, url },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json(updatedVideo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
