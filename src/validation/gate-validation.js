import Joi from "joi";

const gateValidation = Joi.object({
  gatesId: Joi.string().required(),
  gatesName: Joi.string().required(),
  gateStatus: Joi.boolean().required(),
});

const gateUpdateValidation = Joi.object({
  gateStatus: Joi.boolean().required(),
});


export { gateValidation, gateUpdateValidation };
