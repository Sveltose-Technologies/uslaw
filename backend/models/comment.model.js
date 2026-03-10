const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "article",
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

      status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },
    
  },
  { 
    timestamps: true,
    collection: "comment"
}
);


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

