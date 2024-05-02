import path from "node:path";
import fs from "fs/promises";
import crypto from "crypto";
import { nanoid } from "nanoid";
import Jimp from "jimp";

export const generateAvatar = (email) => {
  const emailHash = crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");

  return `https://gravatar.com/avatar/${emailHash}.jpg?d=wavatar`;
};

export const manipulateAvatar = async (tempUpload, originalname, id) => {
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
