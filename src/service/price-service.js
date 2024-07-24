import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
  getPriceValidation,
  createPriceValidation,
  updatePriceValidation,
} from "../validation/price-validation.js";
import { ResponseError } from "../error/response-error.js";
import { request } from "express";

const create = async (request, userId) => {
  const { price } = validate(createPriceValidation, request);
  const existingPrice = await prismaClient.price.findFirst();

  if (existingPrice) {
    throw new ResponseError(404, "Price is already exist");
  }
 
  return prismaClient.price.create({
    data: {
      price, 
      userId
    },
    select: {
      priceId: true,
      userId:true,
      price: true,
    },
  });
};

const update = async (id, data, userId) => {
  const priceId = id.priceId;
  const newPrice = data.price;

  const existingPrice = await prismaClient.price.findUnique({
    where: {
      priceId: priceId,
    },
    select: {
      priceId: true,
      price: true,
      userId: true,
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
      userId: userId,
    },
    select: {
      priceId: true,
      price: true,
      userId: true
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