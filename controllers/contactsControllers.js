import HttpError from "../helpers/HttpError.js";
import { Contact } from "../db/models/contacts.js";
import { checkOwner } from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");

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
    const result = await checkOwner(req.params.contactId, req.user);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = await checkOwner(req.params.contactId, req.user);

    const result = await Contact.findByIdAndDelete(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = await checkOwner(req.params.contactId, req.user);

    const result = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = await checkOwner(req.params.contactId, req.user);

    const result = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};
