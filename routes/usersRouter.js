import express from "express";
import {
  createUserSchema,
  emailSchema,
  subscriptionSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import {
  createNewUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeUserSubscription,
  changeUserAvatar,
  checkUserVerification,
  sendEmailVerification,
} from "../controllers/usersControllers.js";
import { isAuthorizedUser } from "../middleware/isAuthorizedUser.js";
import { uploadAvatar } from "../middleware/uploadAvatar.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(createUserSchema),
  createNewUser,
  sendEmailVerification
);

usersRouter.post("/login", validateBody(createUserSchema), loginUser);

usersRouter.post("/logout", isAuthorizedUser, logoutUser);

usersRouter.get("/current", isAuthorizedUser, getCurrentUser);

usersRouter.patch(
  "/",
  isAuthorizedUser,
  validateBody(subscriptionSchema),
  changeUserSubscription
);

usersRouter.patch("/avatars", isAuthorizedUser, uploadAvatar, changeUserAvatar);

// New router for verification
usersRouter.get("/verify", validateBody(emailSchema), sendEmailVerification);

usersRouter.get("/verify/:verificationToken", checkUserVerification);
//

export default usersRouter;
