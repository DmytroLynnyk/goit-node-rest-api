import HttpError from "../helpers/HttpError.js";
import {
  generateAvatar,
  manipulateAvatar,
  updateAvatar,
} from "../services/avatarsServices.js";
import { addTokenUser, deletTokenUser } from "../services/jwtServices.js";
import {
  findUserByEmail,
  createUser,
  changeSubscription,
  generateToken,
  verifyUser,
  approveVerification,
} from "../services/usersServices.js";

export const createNewUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await findUserByEmail(email);

    if (result) {
      throw HttpError(409, "Email in use");
    }

    req.body.avatarURL = generateAvatar(email);
    req.body.verificationToken = generateToken();

    const user = await createUser(req.body);

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        verificationToken: user.verificationToken,
      },
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
    if (!result || !result.verify || !result.comparePassword(password)) {
      throw HttpError(401, "Email or password is wrong");
    }

    const user = await addTokenUser(result._id);

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

export const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await deletTokenUser(_id);
    res.status(204).json();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({
      email,
      subscription,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const changeUserSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    req.user.subscription = req.body.subscription;
    const newSubscription = await changeSubscription(_id, {
      subscription: req.user.subscription,
    });

    res.status(200).json({
      user: {
        email: newSubscription.email,
        subscription: newSubscription.subscription,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const changeUserAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const { id } = req.user;

    const pathToAvatar = await manipulateAvatar(tempUpload, originalname, id);

    const updatedUser = await updateAvatar(req.user, pathToAvatar);

    res.status(200).json({
      avatarURL: updatedUser.avatarURL,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const checkUserVerification = async (req, res, next) => {
  try {
    const verifiedUser = await verifyUser(req.params.verificationToken);

    if (!verifiedUser) {
      throw HttpError(400, "User not found");
    }

    approveVerification(verifiedUser);

    res.status(200).json({
      message: "Verification successful",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
