const Comment = require("../models/comment.model");

exports.createComment = async (req, res) => {
  try {
    const { userId, articleId, comment,status } = req.body;

    if (!articleId || !comment) {
      return res.status(400).json({
        status: false,
        message: "Article ID and comment are required",
      });
    }

    const newComment = await Comment.create({
      userId: userId, // logged-in user
      articleId: articleId,
      comment,
      status,
    });

    res.status(201).json({
      status: true,
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("userId")
      .populate({
        path: "articleId",
        select: "title",
        populate: {
          path: "category",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("userId")
      .populate({
        path: "articleId",
        select: "title",
        populate: {
          path: "category",
          select: "name",
        },
      });

    if (!comment) {
      return res.status(404).json({
        status: false,
        message: "Comment not found",
      });
    }

    res.status(200).json({
      status: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


exports.updateComment = async (req, res) => {
  try {
    const { comment } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { comment },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        status: false,
        message: "Comment not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        status: false,
        message: "Comment not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


exports.getMostPopularArticlesWithComments = async (req, res) => {
  try {
    const popularArticles = await Comment.aggregate([
      // Group by article
      {
        $group: {
          _id: "$articleId",
          totalComments: { $sum: 1 }
        }
      },

      // Descending order (Most comments first)
      {
        $sort: { totalComments: -1 }
      },

      // Join article details
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "_id",
          as: "article"
        }
      },

      { $unwind: "$article" },

      {
        $project: {
          _id: 0,
          articleId: "$_id",
          title: "$article.title",
          totalComments: 1  
        }
      }
    ]);

    res.status(200).json({
      status: true,
      count: popularArticles.length,
      articles: popularArticles
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

exports.getCommentsByArticleId = async (req, res) => {
  try {
    const { articleId } = req.params;

    if (!articleId) {
      return res.status(400).json({
        status: false,
        message: "Article ID is required",
      });
    }

    const comments = await Comment.find({ articleId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: comments.length,
      comments,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
