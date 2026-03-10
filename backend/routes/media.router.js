const express = require("express");
const router = express.Router();

const {
  createMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
} = require("../controllers/media.controller");
const uploads = require("../middleware/upload");


router.post("/create", uploads.single("image"), createMedia);
router.get("/get-all", getAllMedia);
router.get("/get-by-id/:id", getMediaById);
router.put("/update/:id", uploads.single("image"), updateMedia);
router.delete("/delete/:id", deleteMedia);

module.exports = router;
