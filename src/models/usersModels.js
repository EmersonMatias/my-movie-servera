import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .lowercase()
        .required(),
    email: Joi.string()
        .email()
        .max(100)
        .lowercase()
        .required(),
    password: Joi.string()
        .min(8)
        .max(100).
        required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
})