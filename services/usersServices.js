import { User } from "../db/models/users.js";
import { nanoid } from "nanoid";

export const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.hashPassword();
  // await newUser.hashToken();
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
