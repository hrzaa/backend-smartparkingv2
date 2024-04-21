import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test"
    }
  })
}


export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    }
  })
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test"
    }
  });
}

export const createTestParkings = async () => {
  const createdParking = await prismaClient.parking.create({
    data: {
      code: "test",
      status: "start",
      parkingin: new Date(),
    },
  });

  return createdParking.id;
};

export const removeAllTestParkings = async () => {
  await prismaClient.parking.deleteMany({
    where: {
      code: "test",
    },
  });
};
