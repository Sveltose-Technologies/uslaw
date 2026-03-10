const express = require("express");
const router = express.Router();

const {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} = require("../controllers/video.controller");

router.post("/create", createVideo);
router.get("/get-all", getAllVideos);
router.get("/get-by-id/:id", getVideoById);
router.put("/update/:id", updateVideo);
router.delete("/delete/:id", deleteVideo);

module.exports = router;
