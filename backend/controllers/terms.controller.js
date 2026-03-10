const Terms = require("../models/terms.model");

// ================= CREATE =================
exports.createTerms = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        status: false,
        message: "Text is required",
      });
    }

    const terms = await Terms.create({ text });

    res.status(201).json({
      status: true,
      message: "Terms created successfully",
      data: terms,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
exports.getAllTerms = async (req, res) => {
  try {
    const terms = await Terms.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: terms.length,
      data: terms,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET BY ID =================
exports.getTermsById = async (req, res) => {
  try {
    const terms = await Terms.findById(req.params.id);

    if (!terms) {
      return res.status(404).json({
        status: false,
        message: "Terms not found",
      });
    }

    res.status(200).json({
      status: true,
      count: terms.length,
      data: terms,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= UPDATE =================
exports.updateTerms = async (req, res) => {
  try {
    const { text } = req.body;

    const terms = await Terms.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );

    if (!terms) {
      return res.status(404).json({
        status: false,
        message: "Terms not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Terms updated successfully",
      data: terms,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= DELETE =================
exports.deleteTerms = async (req, res) => {
  try {
    const terms = await Terms.findByIdAndDelete(req.params.id);

    if (!terms) {
      return res.status(404).json({
        status: false,
        message: "Terms not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Terms deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
