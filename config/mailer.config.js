const nodemailer = require("nodemailer");
const template = require("./mailtemplate");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  tls: { rejectUnauthorized: false }
});

module.exports.sendActivationEmail = (email, token) => {
  transporter.sendMail({
    from: `Example name <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: "Thanks for joining us",
    html: template.generateEmail(token),
  });
};
