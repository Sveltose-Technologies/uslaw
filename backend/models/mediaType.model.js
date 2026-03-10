const mongoose = require("mongoose");

const mediaTypeSchema = new mongoose.Schema(
 {
    type: {
      type: String,
      enum: ["logo", "banner"], // ✅ enum applied
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

  },
  {
    timestamps: true,
    collection: "media_types",
  }
);

const MediaType = mongoose.model("MediaType", mediaTypeSchema);

module.exports = MediaType;
