const sendEmail = require("./sendEmail");

const sendVarificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verfiyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm email by clikcking on the following link : <a href="${verfiyEmail}">Varify Email</a> </p>`;
  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4> Hello ${name} </h4> ${message}`,
  });
};

module.exports = sendVarificationEmail;
