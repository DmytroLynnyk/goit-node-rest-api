import { User } from "../db/models/users.js";
import jwt from "jsonwebtoken";
import path from "node:path";
import fs from "fs/promises";
import crypto from "crypto";
import { nanoid } from "nanoid";

const { SECRET_KEY } = process.env;

const signToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "12h" });
};

export const verifyToken = async (token) => {
  return await jwt.verify(token, SECRET_KEY);
};

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

export const addTokenUser = async (id) => {
  const token = signToken(id);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
};

export const deletTokenUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { token: null });
  return user;
};

export const changeSubscription = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  return user;
};

export const generateAvatar = (email) => {
  const emailHash = crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");

  return `https://gravatar.com/avatar/${emailHash}.jpg?d=wavatar`;
};

export const moveAndRenameAvatar = async (tempUpload, originalname, id) => {
  const avatarsDir = path.join("public", "avatars/");

  const extension = originalname.split(".").reverse()[0];
  const avatarId = nanoid();
  const newName = `${id}-${avatarId}.${extension}`;

  const resulUpload = path.join(avatarsDir, newName);

  await fs.rename(tempUpload, resulUpload);

  const avatar = path.join("public", "avatars/", newName);
  return avatar;
};

export const updateAvatar = async (user, pathToAvatar) => {
  if (pathToAvatar) {
    user.avatarURL = pathToAvatar.replace("public", "");
  }

  return user.save();
};
