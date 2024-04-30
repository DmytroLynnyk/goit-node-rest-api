import jwt from "jsonwebtoken";
import path from "node:path";
import fs from "fs/promises";
import crypto from "crypto";
import { nanoid } from "nanoid";

import { User } from "../db/models/users.js";
import Jimp from "jimp";

const { SECRET_KEY } = process.env;

// Token services
export const addTokenUser = async (id) => {
  const token = signToken(id);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
};

export const deletTokenUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { token: null });
  return user;
};

const signToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "12h" });
};

export const verifyToken = async (token) => {
  return await jwt.verify(token, SECRET_KEY);
};

// User services
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

// Subscription services
export const changeSubscription = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  return user;
};

// Avatar services
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

  await Jimp.read(tempUpload).then((image) => {
    return image
      .resize(250, 250)
      .quality(100)
      .write(avatarsDir + newName);
  });
  await fs.unlink(tempUpload);

  const avatar = path.join("public", "avatars/", newName);
  return avatar;
};

export const updateAvatar = async (user, pathToAvatar) => {
  if (pathToAvatar) {
    user.avatarURL = pathToAvatar.replace("public", "");
  }

  return user.save();
};
