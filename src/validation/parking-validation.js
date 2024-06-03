import Joi from "joi";

const createParkingValidation = Joi.object({
  code: Joi.string().max(12).required(),
  parkingin: Joi.date().iso().optional(),
  parkingout: Joi.date().iso().optional(),
  totaltime: Joi.number().optional(),
  // status: Joi.string().max(10).required(),
});

const updateParkingValidation = Joi.object({
  code: Joi.string().max(12).required(),
});

const getParkingValidation = Joi.number().positive().required();

export { 
  createParkingValidation, 
  updateParkingValidation ,
  getParkingValidation
};
