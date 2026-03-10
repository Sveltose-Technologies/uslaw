const Category = require("../models/category.model");

// ================= CREATE =================
exports.createCategory = async (req, res) => {
  try {
    const { categoryName, note, status } = req.body;

    if (!categoryName) {
      return res.status(400).json({
        status: false,
        message: "Category name is required",
      });
    }

    const icon = req.file ? req.file.path : null;

    const category = await Category.create({
      categoryName,
      note,
      icon,
      status,
    });

    res.status(201).json({
      status: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET BY ID =================
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= UPDATE =================
exports.updateCategory = async (req, res) => {
  try {
    const updateData = { ...req.body };

    //  icon update
    if (req.file) {
      updateData.icon = req.file.path;
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= DELETE =================
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
