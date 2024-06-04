import Joi from "joi";

const createPriceValidation = Joi.object({
  price: Joi.number().required(),
});

const updatePriceValidation = Joi.object({
  price: Joi.number().required(),
});

export { createPriceValidation, updatePriceValidation };
