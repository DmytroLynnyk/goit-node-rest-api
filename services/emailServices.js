import nodemailer from "nodemailer";
import { emailTemplate } from "../helpers/__emailTemplate.js";

const transportConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const emailTransport = nodemailer.createTransport(transportConfig);

export const emailService = async (
  protocol,
  host,
  verificationToken,
  email
) => {
  const url = `${protocol}://${host}/api/users/verify/${verificationToken}`;

  const emailConfig = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "EMAIL VERIFICATION",
    html: emailTemplate(url),
    text: "Tap the link to complete your registration and enjoy our services!",
  };

  await emailTransport
    .sendMail(emailConfig)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};
