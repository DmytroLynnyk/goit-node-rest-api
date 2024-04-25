import express from "express";
import { createUserSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import {
  createNewUser,
  loginUser,
  getCurrentUser,
} from "../controllers/usersControllers.js";
import { isAuthorizedUser } from "../middleware/isAuthorizedUser.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(createUserSchema), createNewUser);

usersRouter.post("/login", validateBody(createUserSchema), loginUser);

usersRouter.post("/logout");

usersRouter.get("/current", isAuthorizedUser, getCurrentUser);

export default usersRouter;
