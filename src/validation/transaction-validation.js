import Joi from "joi";

const transactionValidation = Joi.object({
  totalprice: Joi.number().required(),
  TransactionStatus: Joi.string().max(100).required(),
});

export const validateTransactionStatus = [
  check("status")
    .isIn([PENDING_PAYMENT, PAID, CANCELED])
    .withMessage("Status must be one of PENDING_PAYMENT, PAID, CANCELED"),
  errorValidation,
];

export {
    transactionValidation
}

