import { User } from "../db/models/users.js";
import jsonWebToken from "jsonwebtoken";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const updateUserWithToken = async (id) => {
  const { SECRET_KEY } = process.env;
  const token = jsonWebToken.sign({ id }, SECRET_KEY);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
};

export const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.hashPassword();
  await newUser.save();
  const user = updateUserWithToken(newUser._id);
  return user;
};
