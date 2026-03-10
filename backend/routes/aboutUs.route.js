const express = require("express");
const uploads = require("../middleware/upload");
const {
  createAboutUs,
  getAllAboutUs,
  getAboutUsById,
  updateAboutUs,
  deleteAboutUs,
} = require("../controllers/aboutUs.controller");

const router = express.Router();

router.post("/create", uploads.single("image"), createAboutUs);
router.get("/get-all", getAllAboutUs);
router.get("/get-by-id/:id", getAboutUsById);
router.put("/update/:id", uploads.single("image"), updateAboutUs);
router.delete("/delete/:id", deleteAboutUs);

module.exports = router;
