const SubCategory = require("../models/subCategory.model");
const Category = require("../models/category.model");

// ================= CREATE =================
exports.createSubCategory = async (req, res) => {
  try {
    const { category, subCategoryName } = req.body;

    if (!category || !subCategoryName) {
      return res.status(400).json({
        status: false,
        message: "Category & SubCategory name are required",
      });
    }

    // check category exists
    const isCategory = await Category.findById(category);
    if (!isCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
    
const icon = req.file ? req.file.path : null;

    const subCategory = await SubCategory.create({
      category,
      subCategoryName,
      icon,
    });

    res.status(201).json({
      status: true,
      message: "SubCategory created successfully",
      data: subCategory,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// ================= GET ALL =================
exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: subCategories.length,
      data: subCategories,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// ================= GET BY ID =================
exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id)
      .populate("category");

    if (!subCategory) {
      return res.status(404).json({
        status: false,
        message: "SubCategory not found",
      });
    }

    res.status(200).json({ status: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// ================= UPDATE =================
exports.updateSubCategory = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Image update
    if (req.file) {
      updateData.icon = req.file.path;
    }

    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      updateData,   
      { new: true }
    );

    if (!subCategory) {
      return res.status(404).json({
        status: false,
        message: "SubCategory not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "SubCategory updated successfully",
      data: subCategory,
    });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


// ================= DELETE =================
exports.deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

    if (!subCategory) {
      return res.status(404).json({
        status: false,
        message: "SubCategory not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "SubCategory deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
