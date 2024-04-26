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

export const addTokenUser = async (id) => {
  const token = signToken(id);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
};

export const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.hashPassword();
  await newUser.save();
  return newUser;
};

export const deletTokenUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { token: null });
  return user;
};

export const changeSubscription = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};
