import { Contact } from "../db/models/contacts.js";
import HttpError from "../helpers/HttpError.js";

export const checkOwner = async (paramId, user) => {
  const result = await Contact.findById(paramId);

  const { id } = user;
  if (id !== result.owner._id.toString()) {
    // Correct the message after dev is over
    throw HttpError(401, "Not authorized owner");
    // Correct the message after dev is over
  }

  return result;
};
