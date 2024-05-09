import { User } from "../db/models/users.js";

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
