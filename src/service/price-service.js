import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
  getPriceValidation,
  createPriceValidation,
  updatePriceValidation,
} from "../validation/price-validation.js";
import { ResponseError } from "../error/response-error.js";
import { request } from "express";

const create = async (request) => {
  const price = validate(createPriceValidation, request);

  const countPrice = await prismaClient.parking.count();

  if (countPrice > 1) {
    throw new ResponseError(
      404,
      `Price is already exist`
    );
  }
 
  return prismaClient.price.create({
    data: price,
    select: {
      priceId: true,
      price: true,
    },
  });
};

const update = async (id, data) => {
  const priceId = id.priceId;
  const newPrice = data.price;
  // const idReq = validate(getPriceValidation, id);
  // const priceReq = validate(updatePriceValidation, data);

  const existingPrice = await prismaClient.price.findUnique({
    where: {
      priceId: priceId,
    },
    select: {
      priceId: true,
      price: true,
    },
  });

  if (!existingPrice) {
    throw new ResponseError(404, "Price not found");
  }

  return prismaClient.price.update({
    where: {
      priceId: priceId,
    },
    data: {
      price: newPrice,
    },
    select: {
      priceId: true,
      price: true,
    },
  });
};

const getAllPrice = async (request) => {
  const prices = await prismaClient.price.findFirst();

  if (!prices) {
    throw new ResponseError(404, `Prices not found`);
  }

  return prices;
};


export default {
  create,
  update,
  getAllPrice,
};