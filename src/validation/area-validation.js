import Joi from "joi";

const createAreaValidation = Joi.object({
  area: Joi.string().max(100).required(),
});

const updateAreaValidation = Joi.object({
  area: Joi.string().max(100).required(),
});

export { createAreaValidation, updateAreaValidation };
