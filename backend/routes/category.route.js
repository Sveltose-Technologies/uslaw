const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const uploads = require("../middleware/upload");

const router = express.Router();

router.post("/create", uploads.single("icon"), createCategory);
router.get("/get-all", getAllCategories);
router.get("/get-by-id/:id", getCategoryById);
router.put("/update/:id", uploads.single("icon"), updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
