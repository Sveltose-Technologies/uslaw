const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
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

    phone: {
      type: String,
    },

    country: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    profilePic: {
      type: String,
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
    
    isVerified: {
  type: Boolean,
  default: false
},

   status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
