import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const parking_middleware = async (req, res, next) => {
  try {
    const parking_spaces = await prisma.parkingSpace.findMany();
    if (parking_spaces.length) {
      const status = parking_spaces.map((data) => data.status);
      if (status.includes(false)) {
        next();
      } else {
        res.json("full");
      }
    } else {
      next();
    }
  } catch (err) {
    console.log("Error : ", err);
    next();
  }
};
