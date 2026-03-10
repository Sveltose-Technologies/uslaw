const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../services/email");

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ================= REGISTER =================
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "name, email and password All fields are required",
      });
    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        status: false,
        message: "Admin already exists",
      });
    }

const hashedPassword = await bcrypt.hash(password, 10);

   const admin = await Admin.create({ name, email, password:hashedPassword});

    res.status(201).json({
      status: true,
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      },
    });
    
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

     const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      status: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= LOGOUT =================
exports.logoutAdmin = async (req, res) => {
  res.status(200).json({
    status: true,
    message: "Logout successful",
  });
};



exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    admin.resetOtp = await bcrypt.hash(otp, 10);
    admin.resetOtpExpire = Date.now() + 2 * 60 * 1000; // 2 min
    admin.resetOtpVerified = false;

    await admin.save();

 
    await sendEmail(admin.fullName, admin.email, otp);

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
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "admin not found" });

    if (admin.resetOtpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, admin.resetOtp);
    if (!isMatch) { 
      return res.status(400).json({ message: "Invalid OTP" });
    }

    admin.resetOtpVerified = true;
    await admin.save();

    res.status(200).json({ message: "OTP verified successfully" });
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

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "admin not found" });

    if (!admin.resetOtpVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.resetOtp = undefined;
    admin.resetOtpExpire = undefined;
    admin.resetOtpVerified = false;

    await admin.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE ADMIN PROFILE =================

exports.updateAdminProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      facebook,
      twitter,
      linkedin,
      youtube,
      newPassword,
      confirmPassword,
      textEditor
    } = req.body;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    /* ===== BASIC PROFILE UPDATE ===== */
    if (name) admin.name = name;

    /* ===== EMAIL UPDATE ===== */
    if (email && email !== admin.email) {
      const emailExists = await Admin.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          status: false,
          message: "Email already in use",
        });
      }
      admin.email = email.toLowerCase().trim();
    }

    /* ===== SOCIAL LINKS ===== */
    if (facebook !== undefined) admin.facebook = facebook;
    if (twitter !== undefined) admin.twitter = twitter;
    if (linkedin !== undefined) admin.linkedin = linkedin;
    if (youtube !== undefined) admin.youtube = youtube;

    /* ===== PASSWORD UPDATE (NO OLD PASSWORD) ===== */
    if (newPassword || confirmPassword) {
      if (!newPassword || !confirmPassword) {
        return res.status(400).json({
          status: false,
          message: "New password and confirm password are required",
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          status: false,
          message: "New password and confirm password do not match",
        });
      }

      admin.password = await bcrypt.hash(newPassword, 10);
    }
    
if (textEditor !== undefined) {
  admin.textEditor = textEditor;
}

    await admin.save();

    res.status(200).json({
      status: true,
      message: "Admin profile updated successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        facebook: admin.facebook,
        twitter: admin.twitter,
        linkedin: admin.linkedin,
        youtube: admin.youtube,
        textEditor: admin.textEditor,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET ALL ADMINS =================
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find()

    res.status(200).json({
      status: true,
      count: admins.length,
      admins,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
