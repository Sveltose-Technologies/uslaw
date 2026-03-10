const Video = require("../models/video.model");


// ================= CREATE VIDEO =================
exports.createVideo = async (req, res) => {
  try {
    const { videoLink, title, description } = req.body;

    if (!videoLink || !title) {
      return res.status(400).json({
        status: false,
        message: "Video link and title are required",
      });
    }

    const video = await Video.create({
      videoLink,
      title,
      description,
    });

    res.status(201).json({
      status: true,
      message: "Video created successfully",
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// ================= GET ALL VIDEOS =================
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: videos.length,
      data: videos,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// ================= GET VIDEO BY ID =================
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        status: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      status: true,
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// ================= UPDATE VIDEO =================
exports.updateVideo = async (req, res) => {
  try {
    const { videoLink, title, description } = req.body;

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { videoLink, title, description },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({
        status: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Video updated successfully",
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// ================= DELETE VIDEO =================
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).json({
        status: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
