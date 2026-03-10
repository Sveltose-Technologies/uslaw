const express = require("express");
const { createTerms, getAllTerms, getTermsById, updateTerms, deleteTerms } = require("../controllers/terms.controller");
const router = express.Router();

router.post("/create", createTerms);
router.get("/get-all", getAllTerms);
router.get("/get-by-id/:id", getTermsById);
router.put("/update/:id", updateTerms);
router.delete("/delete/:id", deleteTerms);

module.exports = router;
