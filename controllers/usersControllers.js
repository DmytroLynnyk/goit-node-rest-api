import HttpError from "../helpers/HttpError.js";
import {
  findUserByEmail,
  createUser,
  updateUserWithToken,
  verifyToken,
} from "../services/usersServices.js";

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

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await findUserByEmail(email);

    if (!result || !result.comparePassword(password)) {
      throw HttpError(401, "Email or password is wrong");
    }

    const user = await updateUserWithToken(result._id);

    res.status(200).json({
      token: user.token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({
      user: {
        email,
        subscription,
      },
    });
    // console.log(req.user);
    // next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
