const mongoose = require("mongoose");

const privacySchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true,
    collection: "privacyPolicy",
}
);

const PrivacyPolicy = mongoose.model("PrivacyPolicy", privacySchema);

module.exports = PrivacyPolicy;