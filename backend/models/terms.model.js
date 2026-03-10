const mongoose = require("mongoose");

const termsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true,
    collection: "terms"
}
);
const Terms = mongoose.model("Terms", termsSchema);
module.exports = Terms;