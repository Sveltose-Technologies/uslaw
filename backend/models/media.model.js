const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    image: {
      type: String, // stored image path
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MediaType",
      required: true,
    },
    note: {
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
    collection: "media",
  }
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
