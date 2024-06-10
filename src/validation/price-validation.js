import Joi from "joi";

const createPriceValidation = Joi.object({
  price: Joi.number().required(),
});

const getPriceValidation = Joi.object({
  priceId: Joi.string().required(),
});

const updatePriceValidation = Joi.object({
  price: Joi.number().required(),
});

export { getPriceValidation, createPriceValidation, updatePriceValidation };
