import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllParkingAreas = async (req, res) => {
  const parkingAreas = await prisma.parkingArea.findMany({
    orderBy: { parking_name: "asc" },
    include: {
      parkingSpaces: {
        orderBy: { space_name: "asc" },
      },
    },
  });

  res.json(parkingAreas);
};

const getAllParkingSpaces = async (req, res) => {
  const parkingSpaces = await prisma.parkingSpace.findMany({
    orderBy: { space_name: "asc" },
  });

  res.json(parkingSpaces);
};

const updateParkingAreas = async (req, res) => {
  const parkingAreas = req.body;

  await prisma.parkingArea.deleteMany();

  for (const data of parkingAreas) {
    await prisma.parkingArea.create({
      data: {
        id: data.area_id,
        parking_name: data.parking_name,
      },
    });

    for (const item of data.space_names) {
      await prisma.parkingSpace.create({
        data: {
          parkingAreaId: data.area_id,
          space_name: item,
        },
      });
    }
  }

  res.status(201).json(parkingAreas);
};

const updateParkingSpaces = async (req, res) => {
  const parkingSpaces = req.body;

  for (const data of parkingSpaces) {
    await prisma.parkingSpace.update({
      where: { space_name: data.space_name },
      data: {
        status: Boolean(data.status),
      },
    });
  }

  res.status(200).json(parkingSpaces);
};

const deleteAllParkingAreas = async (req, res) => {
  await prisma.parkingArea
    .deleteMany()
    .then(() => res.status(200).json([]))
    .catch((err) => res.status(500).json(err));
};

export default {
  getAllParkingAreas,
  getAllParkingSpaces,
  updateParkingAreas,
  updateParkingSpaces,
  deleteAllParkingAreas,
};
