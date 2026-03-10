const express = require("express");
const { registerAdmin, loginAdmin, logoutAdmin, verifyOtp, resetPassword, forgotPassword, updateAdminProfile, getAllAdmins } = require("../controllers/admin.Controller");


const router = express.Router();

router.post("/register",registerAdmin)
router.post("/login",loginAdmin)
router.post("/logout",logoutAdmin)
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.put("/reset-password", resetPassword);
//  UPDATE PROFILE
router.put("/update/:id", updateAdminProfile);

router.get("/get-all", getAllAdmins);

module.exports = router;