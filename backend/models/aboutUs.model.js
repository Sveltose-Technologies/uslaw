const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    image: {
      type: String, // image path / url
    },

    mission: {
      type:String, 
    },
  },
  { 
    timestamps: true,
    collection:"aboutUs"
}
);

const AboutUs = mongoose.model("AboutUs", aboutUsSchema);

module.exports = AboutUs