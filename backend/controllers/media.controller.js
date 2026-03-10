const Media = require("../models/media.model");

/* CREATE MEDIA */
const createMedia = async (req, res) => {
  try {
    const { type, note, status } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Image is required",
      });
    }

    const media = await Media.create({
      image: req.file.path,
      type,
      note,
      status,
    });

    res.status(201).json({
      status: true,
      message: "Media created successfully",
      data: media,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/* GET ALL MEDIA */
const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find()
      .populate("type")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: media.length,
      data: media,
    });
  } catch (error) {
    res.status(500).json({
        
      status: false,
      message: error.message,
    });
  }
};

/* GET MEDIA BY ID */
const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id).populate("type");

    if (!media) {
      return res.status(404).json({
        status: false,
        message: "Media not found",
      });
    }

    res.status(200).json({
      status: true,
      data: media,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/* UPDATE MEDIA */
const updateMedia = async (req, res) => {
  try {
    const { type, note, status } = req.body;

    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({
        status: false,
        message: "Media not found",
      });
    }

    media.type = type || media.type;
    media.note = note || media.note;
    media.status = status || media.status;

    if (req.file) {
      media.image = req.file.path;
    }

    await media.save();

    res.status(200).json({
      status: true,
      message: "Media updated successfully",
      data: media,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/* DELETE MEDIA */
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);

    if (!media) {
      return res.status(404).json({
        status: false,
        message: "Media not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Media deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};
