import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../db/models/contacts.js";

export const isValidId = async (req, _, next) => {
  const { contactId } = req.params;

  try {
    if (!isValidObjectId(contactId)) {
      next(HttpError(400, `${contactId} is not a valid ID`));
      return;
    }
    const searchedContact = await Contact.findById(contactId);
    if (searchedContact === null) {
      next(HttpError(404, `The contact with ID ${contactId} was not found`));
    }
  } catch (err) {
    console.log(err.message);
  }

  next();
};
