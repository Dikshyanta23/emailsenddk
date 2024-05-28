const nodemailer = require("nodemailer");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const sendEmailEthereal = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: `"Babbal coder" ${process.env.EMAIL_SENDER}`,
    to: "bar@example.com",
    subject: "Yo",
    html: "<h2>Hey there</h2><p>How are you doing?</p>",
  });
  return res.json({ info });
};

const sendEmail = async (req, res) => {
  const { emails, subject, text } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: emails, // Change to your recipient
    from: process.env.EMAIL_SENDER, // Change to your verified sender
    subject: subject,
    text: text,
  };
  const info = await sgMail.send(msg);
  res.status(200).json({ title: "success" });
};
module.exports = sendEmail;
