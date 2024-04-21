import Joi from "joi";

const createParkingValidation = Joi.object({
  code: Joi.string().max(10).required(),
  parkingin: Joi.date().iso().optional(),
  parkingout: Joi.date().iso().optional(),
  totaltime: Joi.number().optional(),
});

const updateParkingValidation = Joi.object({
  code: Joi.string().max(10).required(),
});

export { 
  createParkingValidation, 
  updateParkingValidation 
};
