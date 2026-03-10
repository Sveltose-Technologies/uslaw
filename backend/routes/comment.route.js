const express = require("express");
const {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  getMostPopularArticlesWithComments,
  getCommentsByArticleId,
} = require("../controllers/comment.controller");

const router = express.Router();

router.post("/create", createComment);
router.get("/get-all", getAllComments);
router.get("/get-by-id/:id", getCommentById);
router.put("/update/:id", updateComment);
router.delete("/delete/:id", deleteComment);
router.get("/most-popular", getMostPopularArticlesWithComments);
router.get("/get-by-article/:articleId", getCommentsByArticleId);

module.exports = router;

