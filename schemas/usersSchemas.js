import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "string.email": "Unacceptable email. Try another one.",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).max(32).required().messages({
    "string.min": "Too short password",
    "string.max": "Too long password",
    "any.required": "Password is required",
  }),
});
