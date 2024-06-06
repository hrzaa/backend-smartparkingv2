import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const createTestUser = async () => {
  const token = jwt.sign(
    { 
      userId: "testId", 
      role: "ADMIN" 
    },
    process.env.SECRET_KEY
  );

  return await prismaClient.user.create({
    data: {
      userId: "testId",
      username: "testUser",
      password: await bcrypt.hash("testPass", 10),
      role: "ADMIN",
      token: token,
    },
  });
};

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      userId: "testId",
    },
  });
};

export const createTestPrice = async () => {
  return await prismaClient.price.create({
    data: {
      price: 1000,
    },
  });
};


export const removeTestPrice = async () => {
  await prismaClient.price.deleteMany({
    where: {
      price: 1000,
    },
  });
};

export const getTestUser = async () => {
  return await prismaClient.user.findUnique({
    where: {
      userId: "testId",
    },
  });
};

export const createTestParkings = async () => {
  const createPrice = await prismaClient.price.create({
    data: {
      price: 1000,
    },
  });

  const createdParking = await prismaClient.parking.create({
    data: {
      code: "test",
      status: "start",
      parkingin: new Date(),
    },
  });

  return createdParking.id;
};

export const removeAllTestTransactions = async () => {
  const parkings = await prismaClient.parking.findMany({
    where: {
      code: "test",
    },
    select: {
      id: true,
    },
  });

  const parkingIds = parkings.map((parking) => parking.id);

  await prismaClient.transaction.deleteMany({
    where: {
      parkingId: {
        in: parkingIds,
      },
    },
  });
}

export const removeAllTestParkings = async () => {
  await prismaClient.parking.deleteMany({
    where: {
      code: "test",
    },
  });
  await prismaClient.price.deleteMany({
    where: {
      price: 1000,
    },
  });
};

export const getTestParkings = async () => {
  const parking = await prismaClient.parking.findFirst({
    where: {
      code: "test",
    },
  });

  return parking;
};

