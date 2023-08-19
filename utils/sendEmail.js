const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "stest36199709@gmail.com",
      pass: "fitwxhgyzixlvxkj",
    },
  });
  const mailOptions = {
    from: "stest36199709@gmail.com",
    to,
    subject,
    html,
  };

  return mailTransporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Successfully sent email.",response);
    }
  });
};

module.exports = sendEmail;
