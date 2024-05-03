import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import { isValidId } from "../middleware/isValidId.js";
import { isAuthorizedUser } from "../middleware/isAuthorizedUser.js";

const contactsRouter = express.Router();

contactsRouter.get("/", isAuthorizedUser, getAllContacts);

contactsRouter.get("/:contactId", isAuthorizedUser, isValidId, getOneContact);

contactsRouter.delete(
  "/:contactId",
  isAuthorizedUser,
  isValidId,
  deleteContact
);

contactsRouter.post(
  "/",
  isAuthorizedUser,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:contactId",
  isAuthorizedUser,
  isValidId,
  validateBody(updateContactSchema),
  updateContact
);
contactsRouter.patch(
  "/:contactId/favorite",
  isAuthorizedUser,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
