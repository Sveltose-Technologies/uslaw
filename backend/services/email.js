const nodemailer = require("nodemailer");

const sendEmail = async (fullName, email, otp) => {
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

    const info = await transporter.sendMail({
      from: `"Sapience Desk" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2>Hello ${fullName},</h2>
          <p>Your OTP is:</p>
          <h1 style="color:#4CAF50">${otp}</h1>
          <p>This OTP is valid for <strong>2 minutes</strong>.</p>
        </div>
      `,
    });

    return info;
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
};

module.exports = sendEmail;
