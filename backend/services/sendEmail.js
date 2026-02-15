const nodemailer = require("nodemailer");

// Sends an email using the configured SMTP credentials.
// Options shape: { email, subject, message }

const sendEmail = async (options) => {
  const user = process.env.SMTP_USER ;
  const pass = process.env.SMTP_PASS ;
  const from = process.env.SMTP_FROM || user;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Failed to send email:", err.message);
    throw err;
  }
};

module.exports = sendEmail;