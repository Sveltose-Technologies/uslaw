const MediaType = require("../models/mediaType.model");

// ================= CREATE =================
exports.createMediaType = async (req, res) => {
  try {
    const { type} = req.body;

    if (!type) {
      return res.status(400).json({
        status: false,
        message: "Media type is required",
      });
    }

    if (!["logo", "banner"].includes(type)) {
  return res.status(400).json({
    status: false,
    message: "Type must be either logo or banner",
  });
}

    const exists = await MediaType.findOne({ type });

    if (exists) {
      return res.status(400).json({
        status: false,
        message: "Media type already exists",
      });
    }

    const mediaType = await MediaType.create({
      type,
    });

    res.status(201).json({
      status: true,
      message: "Media type created successfully",
      mediaType,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
exports.getAllMediaTypes = async (req, res) => {
  try {
    const mediaTypes = await MediaType.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: mediaTypes.length,
      mediaTypes,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET BY ID =================
exports.getMediaTypeById = async (req, res) => {
  try {
    const mediaType = await MediaType.findById(req.params.id);

    if (!mediaType) {
      return res.status(404).json({
        status: false,
        message: "Media type not found",
      });
    }

    res.status(200).json({
      status: true,
      mediaType,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= UPDATE =================
exports.updateMediaType = async (req, res) => {
  try {
    const mediaType = await MediaType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!mediaType) {
      return res.status(404).json({
        status: false,
        message: "Media type not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Media type updated successfully",
      count:mediaType.length,
      mediaType,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= DELETE =================
exports.deleteMediaType = async (req, res) => {
  try {
    const mediaType = await MediaType.findByIdAndDelete(req.params.id);

    if (!mediaType) {
      return res.status(404).json({
        status: false,
        message: "Media type not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Media type deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
