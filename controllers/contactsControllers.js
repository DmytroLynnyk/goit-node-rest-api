import HttpError from "../helpers/HttpError.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const result = await listContacts();
    if (!result.length) {
      throw HttpError(404, "There is no contact");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const result = await getContactById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const result = await removeContact(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await addContact(name, email, phone);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const result = await updateContactById(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
