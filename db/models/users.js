import { Schema, model } from "mongoose";
import { handleMongooseError } from "../../helpers/handleMongooseError.js";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: String,
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

userSchema.post("save", handleMongooseError);

userSchema.methods.hashPassword = async function () {
  this.password = await bcryptjs.hash(this.password, 10);
};

userSchema.methods.comparePassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

export const User = model("user", userSchema);
