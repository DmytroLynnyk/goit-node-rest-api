import { User } from "../db/models/users.js";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import { emailTemplate } from "../helpers/__emailTemplate.js";

export const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.hashPassword();
  await newUser.save();
  return newUser;
};

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const changeSubscription = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  return user;
};

export const generateToken = () => {
  const otp = nanoid();
  return otp;
};

export const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  return user;
};

export const approveVerification = async (verifiedUser) => {
  verifiedUser.verificationToken = null;
  verifiedUser.verify = true;

  const user = await User.findByIdAndUpdate(verifiedUser._id, verifiedUser, {
    new: true,
  });

  return user;
};

// Emails service (need to receive user)
export const emailService = async (email, url) => {
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
