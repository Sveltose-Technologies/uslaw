const Privacy = require("../models/privacy.model");

// ================= CREATE =================
exports.createPrivacy = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        status: false,
        message: "Text is required",
      });
    }

    const privacy = await Privacy.create({ text });

    res.status(201).json({
      status: true,
      message: "Privacy Policy created successfully",
      data: privacy,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
exports.getAllPrivacy = async (req, res) => {
  try {
    const privacy = await Privacy.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: privacy.length,
      data: privacy,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET BY ID =================
exports.getPrivacyById = async (req, res) => {
  try {
    const privacy = await Privacy.findById(req.params.id);

    if (!privacy) {
      return res.status(404).json({
        status: false,
        message: "Privacy Policy not found",
      });
    }

    res.status(200).json({
      status: true,
      count: privacy.length,
      data: privacy,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= UPDATE =================
exports.updatePrivacy = async (req, res) => {
  try {
    const { text } = req.body;

    const privacy = await Privacy.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );

    if (!privacy) {
      return res.status(404).json({
        status: false,
        message: "Privacy Policy not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Privacy Policy updated successfully",
      data: privacy,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= DELETE =================
exports.deletePrivacy = async (req, res) => {
  try {
    const privacy = await Privacy.findByIdAndDelete(req.params.id);

    if (!privacy) {
      return res.status(404).json({
        status: false,
        message: "Privacy Policy not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Privacy Policy deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
