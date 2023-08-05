const nodemailer = require("nodemailer");
const condemailerConfig = require("./nodeMailerConfig");
const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport(condemailerConfig);

  // send mail with defined transport object
  return transporter.sendMail({
    from: '"Fred Foo 👻" <alden.russel@ethereal.email>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
