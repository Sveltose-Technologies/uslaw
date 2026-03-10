const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },

    note: {
      type: String,
      trim: true,
    },
    
    icon: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },
  },
  {
     timestamps: true, 
    collection: "category"    
}
);

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
