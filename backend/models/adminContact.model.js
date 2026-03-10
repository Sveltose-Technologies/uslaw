const mongoose = require("mongoose");

const adminContactSchema = new mongoose.Schema(
  {
  text: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { 
    timestamps: true,
    collection: "adminContact"}
);

const AdminContact = mongoose.model("AdminContact", adminContactSchema);

module.exports = AdminContact;
