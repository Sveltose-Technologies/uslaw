const AboutUs = require("../models/aboutUs.model");

/* ================= CREATE ================= */
exports.createAboutUs = async (req, res) => {
  try {
    const { text, mission } = req.body;

    if (!text) {
      return res.status(400).json({
        status: false,
        message: "Text is required",
      });
    }

   const image = req.file ? req.file.path : null;

    const about = await AboutUs.create({
      text,
      mission,
      image,
    });

    // 🔽 formatted response
  res.status(200).json({
      status: true,
      data: {
        mission: about.mission,
        sections: {
          _id: about._id,
          text: about.text,
          image: about.image,
          createdAt: about.createdAt,
          updatedAt: about.updatedAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


/* ================= GET ALL ================= */
exports.getAllAboutUs = async (req, res) => {
  try {
    const about = await AboutUs.find().sort({ createdAt: -1 });

    const sections = about.map((item) => {
      const { mission, __v, ...rest } = item._doc;
      return rest;
    });

    // mission hamesha latest se lo
    const mission = about.length ? about[0].mission : "";

    res.status(200).json({
      status: true,
      data: {
        mission,
        sections,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


// /* ================= GET BY ID ================= */
exports.getAboutUsById = async (req, res) => {
  try {
    const about = await AboutUs.findById(req.params.id);

    if (!about) {
      return res.status(404).json({
        status: false,
        message: "About Us not found",
      });
    }

    res.status(200).json({
      status: true,
      data: {
        mission: about.mission,
        sections: {
          _id: about._id,
          text: about.text,
          image: about.image,
          createdAt: about.createdAt,
          updatedAt: about.updatedAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ================= */
exports.updateAboutUs = async (req, res) => {
  try {
    const updateData = {
      text: req.body.text,
      mission: req.body.mission, // ✅ YEH LINE IMPORTANT
    };

    if (req.file) {
      updateData.image = req.file.path; // best practice
    }

    const about = await AboutUs.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!about) {
      return res.status(404).json({
        status: false,
        message: "About Us not found",
      });
    }

    res.status(200).json({
      status: true,
      data: {
        mission: about.mission,
        sections: {
          _id: about._id,
          text: about.text,
          image: about.image,
          createdAt: about.createdAt,
          updatedAt: about.updatedAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


/* ================= DELETE ================= */
exports.deleteAboutUs = async (req, res) => {
  try {
    const about = await AboutUs.findByIdAndDelete(req.params.id);

    if (!about) {
      return res.status(404).json({
        status: false,
        message: "About Us not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "About Us deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
