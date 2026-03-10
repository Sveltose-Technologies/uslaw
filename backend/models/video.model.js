const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    videoLink: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { 
    timestamps: true,
    collection: "video"
}
);
const Video = mongoose.model("Video", videoSchema);
module.exports = Video;