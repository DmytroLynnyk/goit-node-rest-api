import HttpError from "../helpers/HttpError.js";
import { findUserByEmail, createUser } from "../services/usersServices.js";

export const createNewUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    if (user) {
      throw HttpError(409, "User with this email already exists");
    }

    const newUser = await createUser(req.body);

    res.status(201).json({ newUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
