import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().min(8).max(100).required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().min(8).max(100).required(),
});

const getUserValidation = Joi.object({
  userId: Joi.string().required(),
});

const updateUserValidation = Joi.object({
  username: Joi.string().max(255).optional(),
  password: Joi.string().min(8).max(255).optional(),
});


export {
    registerUserValidation, 
    loginUserValidation,
    getUserValidation, 
    updateUserValidation
}