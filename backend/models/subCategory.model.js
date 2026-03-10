const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category", 
      required: true,
    },

    subCategoryName: {
      type: String,
      required: true,
      trim: true,
    },
    
      icon: {
      type: String,
      trim: true,
    },

  },
  {
    timestamps: true,
    collection: "subcategory",
  }
);

const SubCategory = mongoose.model("subcategory", subCategorySchema);
module.exports = SubCategory;
