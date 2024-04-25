import { User } from "../db/models/users.js";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const signToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "12h" });
};

export const verifyToken = async (token) => {
  return await jwt.verify(token, SECRET_KEY);
};

export const updateUserWithToken = async (id) => {
  const token = signToken(id);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
};

export const checkUserData = async (userData) => {
  const { email, password } = userData;
  const user = findUserByEmail(email);
  if (!user || !user.comparePassword(password))
    throw HttpError(401, "Email or password is wrong");
};

export const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.hashPassword();
  await newUser.save();
  const user = updateUserWithToken(newUser._id);
  return user;
};
