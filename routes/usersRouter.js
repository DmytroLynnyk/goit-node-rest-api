import express from "express";
import {
  createUserSchema,
  subscriptionSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import {
  createNewUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeUserSubscription,
  uploadNewAvatar,
} from "../controllers/usersControllers.js";
import { isAuthorizedUser } from "../middleware/isAuthorizedUser.js";
import { upload } from "../middleware/avatarUpload.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(createUserSchema), createNewUser);

usersRouter.post("/login", validateBody(createUserSchema), loginUser);

usersRouter.post("/logout", isAuthorizedUser, logoutUser);

usersRouter.get("/current", isAuthorizedUser, getCurrentUser);

usersRouter.patch(
  "/",
  isAuthorizedUser,
  validateBody(subscriptionSchema),
  changeUserSubscription
);

// Upload new avatar
usersRouter.patch(
  "/avatars",
  isAuthorizedUser,
  upload.single("avatar"),
  uploadNewAvatar
);

export default usersRouter;
