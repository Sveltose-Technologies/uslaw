const Event = require("../models/event.model");

// ================= CREATE EVENT =================
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      location,
      startTime,
      endTime,
      status,
    } = req.body;

    // Required field validation
    if (
      !title ||
      !description ||
      !startDate ||
      !location ||
      !startTime 
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const image = req.file ? req.file.path : null;

    const event = await Event.create({
      title,
      description,
      startDate,
      endDate,
      location,
      startTime,
      endTime,
      image,
      status: status || "active", 
    });

    res.status(201).json({
      status: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET ALL EVENTS =================
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET EVENT BY ID =================
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      status: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= UPDATE EVENT =================
exports.updateEvent = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Update image if new file uploaded
    if (req.file) {
      updateData.image = req.file.path;
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= DELETE EVENT =================
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
