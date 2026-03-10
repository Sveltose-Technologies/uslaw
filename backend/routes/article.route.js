const express = require("express");
const {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../controllers/article.controller");
const uploads = require("../middleware/upload");

const router = express.Router();

router.post("/create",
     uploads.single("featureImage"),
    createArticle);
router.get("/get-all", getAllArticles);
router.get("/get-by-id/:id", getArticleById);
router.put("/update/:id", 
    uploads.single("featureImage"),
  updateArticle);
router.delete("/delete/:id", deleteArticle);

module.exports = router;
