const express = require("express");
const { createSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory, deleteSubCategory } = require("../controllers/subCategory.controller");
const uploads = require("../middleware/upload");
const router = express.Router();
// const subCategoryController = require("../controllers/subCategory.controller");

router.post("/create", uploads.single("icon"), createSubCategory);
router.get("/get-all", getAllSubCategories);
router.get("/get-by-id/:id", getSubCategoryById);
router.put("/update/:id",uploads.single("icon"), updateSubCategory);
router.delete("/delete/:id", deleteSubCategory);

module.exports = router;
