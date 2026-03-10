const Article = require("../models/article.model");
const Category = require("../models/category.model");
const SubCategory = require("../models/subCategory.model");

// ================= CREATE =================
exports.createArticle = async (req, res) => {
  try {
    const { title, content, category, subCategory, videoLink,status,featured } = req.body;

    if (!title || !content || !category || !subCategory) {
      return res.status(400).json({
        status: false,
        message: "Title, content, category and subCategory are required",
      });
    }

  const isCategory = await Category.findById(category);
  if(!isCategory) {
    return res.status(404).json({
      status: false,
      message: "Category not found",
    })
  }

  const isSubCategory = await SubCategory.findById(subCategory);
  if(!isSubCategory) {
    return res.status(404).json({   
      status: false,
      message: "SubCategory not found",
    })    

  }
const featureImage = req.file ? req.file.path : null;

    const article = await Article.create({
      title,
      content,
      category,
      subCategory,
      featureImage,
      videoLink,
      status,
      featured:
        featured === "true" || featured === true ? true : false,
    });

    res.status(201).json({
      status: true,
      message: "Article created successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("category")
      .populate("subCategory")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET BY ID =================
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    .populate( "category")
    .populate( "subCategory");

    if (!article) {
      return res.status(404).json({
        status: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      status: true,
      article,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= UPDATE =================
exports.updateArticle = async (req, res) => {
  try {
    const updateData = {};

    if (req.body) {
      Object.assign(updateData, req.body);

      if (req.body.featured !== undefined) {
        updateData.featured =
          req.body.featured === "true" || req.body.featured === true;
      }

      if (req.body.status) {
        updateData.status = req.body.status;
      }
    }

    if (req.file) {
      updateData.featureImage = req.file.path;
    }

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!article) {
      return res.status(404).json({
        status: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Article updated successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// ================= DELETE =================
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({
        status: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
