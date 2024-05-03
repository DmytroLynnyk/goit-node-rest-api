import { nanoid } from "nanoid";
import { User } from "../db/models/users.js";

export const generateOtp = () => {
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
