const ContactUs = require("../models/contactUs.model");
const nodemailer = require("nodemailer");

// ================= CREATE CONTACT =================
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message, contactNo } = req.body;

    if (!name || !email || !subject || !message || !contactNo) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // Save to DB
    const contact = await ContactUs.create({
      name,
      email,
      subject,
      message,
      contactNo,
    });

    // ================= SEND MAIL TO USER =================
    try {
     const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
         auth: {
           user: process.env.EMAIL_USER,   
           pass: process.env.EMAIL_PASS,
         },
       });

  const mailOptions = {
  from: `"Sapience Desk" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,                       
  replyTo: `"${name}" <${email}>`,                
  subject: `Subject: ${subject}`,
  html: `
    <h3>New Contact Message</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Contact No:</b> ${contactNo}</p>
    <p><b>Subject:</b> ${subject}</p>
    <p><b>Message:</b>${message}</p>
  `,
};
        
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.log("User mail failed:", mailError.message);
    }
    // ====================================================

    return res.status(201).json({
      status: true,
      message: "Contact submitted & email sent to user",
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactUs.find()
      .sort({ createdAt: -1 });

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
    const contact = await ContactUs.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        status: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({ status: true, data: contact });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// ================= UPDATE =================
exports.updateContact = async (req, res) => {
  try {
    const contact = await ContactUs.findByIdAndUpdate(
      req.params.id,
      req.body,
     { new: true }
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
    const contact = await ContactUs.findByIdAndDelete(req.params.id);

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
