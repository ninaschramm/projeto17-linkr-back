import Joi from "joi";

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    picture: Joi.string().uri().required()
})

export default signUpSchema;