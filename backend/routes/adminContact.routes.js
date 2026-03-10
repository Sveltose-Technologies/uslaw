const express = require("express");
const { createContact, getAllContact, getContactById, updateContact, deleteContact } = require("../controllers/adminContact.controller");
const router = express.Router();

router.post("/create",createContact);
router.get("/get-all", getAllContact);
router.get("/get-by-id/:id", getContactById);
router.put("/update/:id", updateContact);
router.delete("/delete/:id", deleteContact);

module.exports = router;
