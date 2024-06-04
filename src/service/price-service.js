import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { createPriceValidation } from "../validation/price-validation.js";

const create = async (request) => {
  const price = validate(createPriceValidation, request);
 
  return prismaClient.price.create({
    data: price,
    select: {
      priceId: true,
      price: true,
    },
  });
};

const getAllPrice = async (request) => {
  const prices = await prismaClient.price.findMany();

  if (!prices) {
    throw new Error(404, `Prices not found`);
  }

  return prices;
};


export default {
  create,
  getAllPrice,
};