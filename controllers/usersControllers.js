import HttpError from "../helpers/HttpError.js";
import { findUserByEmail, createUser } from "../services/usersServices.js";

export const createNewUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await findUserByEmail(email);

    if (result) {
      throw HttpError(409, "Email in use");
    }

    const user = await createUser(req.body);

    res.status(201).json({
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
