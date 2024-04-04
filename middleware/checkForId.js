import HttpError from "../helpers/HttpError.js";
import { listContacts } from "../services/contactsServices.js";

export const checkForId = async (req, _, next) => {
  const { id } = req.params;
  const contacts = await listContacts();
  const result = contacts.map((contact) => contact.id === id);

  if (!result.includes(true)) {
    next(HttpError(404));
    return;
  }
  next();
};
