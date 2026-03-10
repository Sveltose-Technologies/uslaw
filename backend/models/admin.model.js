const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

        /* ===== FORGOT PASSWORD OTP ===== */
    resetOtp: {
      type: String,
    },

    resetOtpExpire: {
      type: Date,
    },

    resetOtpVerified: {
      type: Boolean,
      default: false,
    },

      facebook: {
      type: String,
      trim: true,
      default: "",
    },
    twitter: {
      type: String,
      trim: true,
      default: "",
    },
    linkedin: {
      type: String,
      trim: true,
      default: "",
    },
      youtube: {
      type: String,
      trim: true,
      default: "",
    },

    textEditor:{
      type : String,
    },

  },
  { 
    timestamps: true, 
    collection: "admin"  
}
);

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;