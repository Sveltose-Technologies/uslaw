const express = require("express");
const { createPrivacy, getAllPrivacy, getPrivacyById, updatePrivacy, deletePrivacy } = require("../controllers/privacy.controller");
const router = express.Router();

router.post("/create",createPrivacy);
router.get("/get-all", getAllPrivacy);
router.get("/get-by-id/:id", getPrivacyById);
router.put("/update/:id", updatePrivacy);
router.delete("/delete/:id", deletePrivacy);

module.exports = router;
