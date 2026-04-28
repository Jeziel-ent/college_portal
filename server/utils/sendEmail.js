const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com",
        pass: "your_app_password" // ⚠️ not your normal password
      }
    });

    await transporter.sendMail({
      from: "College Portal",
      to,
      subject,
      text
    });

    console.log("📧 Email sent to:", to);

  } catch (err) {
    console.error("Email error:", err);
  }
};

module.exports = sendEmail;