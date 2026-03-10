const AdminContact = require("../models/adminContact.model.js");

// ================= CREATE =================
exports.createContact = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        status: false,
        message: "Text field is required",
      });
    }

    const contact = await AdminContact.create({ text });

    res.status(201).json({
      status: true,
      message: "Contact created successfully",
      data: contact,
    });

  } catch (error) {
    res.status(500).json({
      
      status: false,
      message: error.message,
    });
  }
};


// ================= GET ALL =================
exports.getAllContact = async (req, res) => {
  try {
    const contacts = await AdminContact.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: contacts.length,
      data: contacts,
    });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


// ================= GET BY ID =================
exports.getContactById = async (req, res) => {
  try {
    const contact = await AdminContact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        status: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      status: true,
      data: contact,
    });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


// ================= UPDATE =================
exports.updateContact = async (req, res) => {
  try {
    const { text } = req.body;

    const contact = await AdminContact.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        status: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Contact updated successfully",
      data: contact,
    });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


// ================= DELETE =================
exports.deleteContact = async (req, res) => {
  try {
    const contact = await AdminContact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        status: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Contact deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
