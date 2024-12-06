//DreamStream\backend\routes\videoRoutes.js
const express = require('express');
const { getVideos, addVideo, deleteVideo, updateVideo } = require('../controllers/videoController');

const router = express.Router();

// GET all videos
router.get('/', getVideos);

// POST a new video
router.post('/', addVideo);

// DELETE a video by ID
router.delete('/:id', deleteVideo);

// PUT (update) a video by ID
router.put('/:id', updateVideo);

module.exports = router;
