const express = require("express");
const router = express.Router();
const uploads = require("../middleware/upload");

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

// Add upload.single("image")
router.post("/create", uploads.single("image"), createEvent);
router.put("/update/:id", uploads.single("image"), updateEvent);
router.get("/get-all", getAllEvents);
router.get("/get-by-id/:id", getEventById);
router.delete("/delete/:id", deleteEvent);

module.exports = router;
