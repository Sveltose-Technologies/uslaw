const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/email");

// ================= TOKEN =================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ================= SIGNUP =================
// exports.signupUser = async (req, res) => {
//   try {
//     const { fullName, email, phone, country, password } = req.body;

//     if (!fullName || !email || !phone || !country || !password) {
//       return res.status(400).json({
//         status: false,
//         message: "All fields are required",
//       });
//     }

//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({
//         status: false,
//         message: "User already exists",
//       });
//     }

//   const profilePic = req.file ? req.file.path: null


//    const hashedPassword = await bcrypt.hash(password, 10);
   
//     const user = await User.create({
//       fullName,
//       email,
//       phone,
//       country,
//       password: hashedPassword,
//       profilePic,
//     });

//     res.status(201).json({
//       status: true,
//       message: "User registered successfully",
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         phone: user.phone,
//         country: user.country,
//         profilePic: user.profilePic,
//         token: generateToken(user._id),
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };


exports.signupUser = async (req, res) => {
  try {
    const { fullName, email, phone, country, password, status } = req.body;

    console.log("BODY:", req.body); // 🔍 debug

    // ✅ Better validation
    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !country?.trim() ||
      !password?.trim()
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    const profilePic = req.file ? req.file.path : null;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone || undefined, // ✅ optional
      country: country.trim(),
      password: await bcrypt.hash(password, 10),
      profilePic,
      resetOtp: await bcrypt.hash(otp, 10),
      resetOtpExpire: Date.now() + 5 * 60 * 1000,
      isVerified: false,
      status,
    });

    await sendEmail(fullName, email, otp);

    res.status(200).json({
      status: true,
      message: "OTP sent to your email",
      userId: user._id,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    // IMPORTANT CHECK
    if (!user.isVerified) {
      return res.status(401).json({
        status: false,
        message: "Please verify OTP first to complete signup",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid password",
      });
    }

    res.status(200).json({
      status: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      status: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET BY ID =================
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= UPDATE =================
exports.updateUser = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };

      if (req.file) {
      updatedData.profilePic = req.file.path; // best practice
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      user,
    });

    
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= DELETE =================
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = await bcrypt.hash(otp, 10);
    user.resetOtpExpire = Date.now() + 2 * 60 * 1000; // 2 min
    user.resetOtpVerified = false;

    await user.save();

    await sendEmail(user.fullName, user.email, otp);

    res.status(200).json({
      status: true,
      message: "OTP sent to your email",
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// Step 2: Verify OTP
// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.resetOtpExpire < Date.now()) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     const isMatch = await bcrypt.compare(otp, user.resetOtp);
//     if (!isMatch) { 
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     user.resetOtpVerified = true;
//     await user.save();

//     res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.resetOtpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, user.resetOtp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ SIGNUP COMPLETE HERE
    user.isVerified = true;
    user.resetOtpVerified = true;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.status(200).json({
      status: true,
      message: "OTP verified",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Step 3: Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.resetOtpVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    user.resetOtpVerified = false;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

