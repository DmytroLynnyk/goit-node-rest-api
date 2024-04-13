import HttpError from "../helpers/HttpError.js";
import { isValidObjectId } from "mongoose";

export const isValidId = async (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }
  next();
};
