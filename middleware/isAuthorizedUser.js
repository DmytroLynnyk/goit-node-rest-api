import { User } from "../db/models/users.js";
import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../services/usersServices.js";

export const isAuthorizedUser = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    try {
      if (bearer !== "Bearer") next(HttpError(401, "Not authorized"));

      const { id } = await verifyToken(token);
      const user = await User.findById(id);

      if (!user) throw HttpError(401, "Not authorized");

      req.user = user;
      next();
    } catch (err) {
      next(HttpError(401, "Not authorized"));
    }
  } catch (err) {
    if ((err.message = "Invalid signature")) err.status = 401;

    next(err);
  }
};
