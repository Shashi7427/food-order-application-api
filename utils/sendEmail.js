const nodemailer = require("nodemailer");
const condemailerConfig = require("./nodeMailerConfig");
const mg = require("nodemailer-mailgun-transport");
const mailgunAuth = {
  auth: {
    api_key: "fa1411f86c2f5d46a8c602122be5df3d-4e034d9e-53923e85",
    domain: "sandbox144de218c7d1476a991be41623e54e55.mailgun.org",
  },
};

const sendEmail = async ({ to, subject, html }) => {
  const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));
  const transporter = nodemailer.createTransport(condemailerConfig)
  const mailOptions = {
    from: "shashitarode1@gmail.com",
    to,
    subject,
    html,
  };
  // send mail with defined transport object
  console.log(to,subject)
  return smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Successfully sent email.");
    }
  });
};

module.exports = sendEmail;
