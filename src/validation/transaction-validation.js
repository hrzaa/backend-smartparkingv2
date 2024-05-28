import Joi from "joi";

const transactionValidation = Joi.object({
  totalprice: Joi.number().required(),
  TransactionStatus: Joi.string().max(100).required(),
});

export {
    transactionValidation
}

