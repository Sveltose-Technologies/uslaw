const express = require("express");
const {
  signupUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controllers/user.controller");

const uploads = require("../middleware/upload");

const router = express.Router();

router.post("/register", uploads.single("profilePic"), signupUser);
router.post("/login", loginUser);
router.get("/get-all", getAllUsers);
router.get("/get-by-id/:id", getUserById);
router.put("/update/:id", uploads.single("profilePic"), updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.put("/reset-password", resetPassword);
module.exports = router;
