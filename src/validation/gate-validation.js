import Joi from "joi";

const GateValidation = Joi.object({
  gatesId: Joi.string().required(),
  gateStatus: Joi.boolean().required(),
});

// const createGateValidation = Joi.object({
//   gateStatus: Joi.boolean().required(),
// });

// const updateGateValidation = Joi.object({
//   gateStatus: Joi.boolean().required(),
// });

export { GateValidation };
