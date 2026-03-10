const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String, // text editor HTML / markdown
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },

     subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategory",
      required: true,
    },

    featureImage: {
      type: String, // image URL or file path
    },

    videoLink: {
      type: String, // youtube or video url
      trim: true,
    },
       status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },

      featured: {
      type: Boolean,
      default: false, // NO by default
    },

    

  },
  { timestamps: true }
);

const Article = mongoose.model("article", articleSchema);

module.exports = Article;
