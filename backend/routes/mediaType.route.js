const express = require("express");
const {
  createMediaType,
  getAllMediaTypes,
  getMediaTypeById,
  updateMediaType,
  deleteMediaType,
} = require("../controllers/mediaType.controller");

const router = express.Router();

router.post("/create", createMediaType);
router.get("/get-all", getAllMediaTypes);
router.get("/get-by-id/:id", getMediaTypeById);
router.put("/update/:id", updateMediaType);
router.delete("/delete/:id", deleteMediaType);

module.exports = router;
