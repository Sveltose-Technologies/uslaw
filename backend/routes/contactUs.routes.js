const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactUs.controller");

// CREATE (Contact form submit)
router.post("/create", createContact);

// GET ALL (Admin)
router.get("/get-all", getAllContacts);

// GET BY ID (Admin)
router.get("/get-by-id/:id", getContactById);

// UPDATE (Admin)
router.put("/update/:id", updateContact);

// DELETE (Admin)
router.delete("/delete/:id", deleteContact);

module.exports = router;
