const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    
    contactNo: {
      type: String,
      trim: true,
    },
    
    // job: {
    //   type: String, // optional (Developer, Designer, etc.)
    // },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // agar logged-in user ho
    // },
  },
  { 
    timestamps: true,
  collection: "contactUs" 
}
);

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
module.exports = ContactUs;
