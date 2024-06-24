import Joi from "joi";

const createParkingValidation = Joi.object({
  code: Joi.string().min(3).max(9).required(),
  parkingin: Joi.date().iso().optional(),
  parkingout: Joi.date().iso().optional(),
  totaltime: Joi.number().optional(),
});

const updateParkingValidation = Joi.object({
  code: Joi.string().min(3).max(9).required(),
});

const getParkingValidation = Joi.object({
  parkingId: Joi.string().max(100).required(),
});

export { 
  createParkingValidation, 
  updateParkingValidation ,
  getParkingValidation
};
