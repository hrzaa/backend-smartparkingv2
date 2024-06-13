import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllMainAreas = async (req, res) => {
  const mainAreas = await prisma.mainArea.findMany({
    orderBy: { name: "asc" },
    include: { areas: true },
  });
  res.json(mainAreas);
};

export const createMainAreas = async (req, res) => {
  const mainAreas = req.body;

  await prisma.area.deleteMany({});
  await prisma.mainArea.deleteMany({});

  for (const data of mainAreas) {
    await prisma.mainArea.create({
      data: {
        id: data.area_id,
        name: data.area_name,
      },
    });
    for (const item of data.area_names) {
      await prisma.area.create({
        data: {
          mainAreaId: data.area_id,
          name: item,
        },
      });
    }
  }

  const datas = await prisma.mainArea.findMany({
    include: { areas: true },
  });

  res.status(201).json(datas);
};

export const getAllAreas = async (req, res) => {
  const areas = await prisma.area.findMany({
    orderBy: { name: "asc" },
  });

  res.json(areas);
};

export const updateAllAreas = async (req, res) => {
  const areas = req.body;

  for (const data of areas) {
    await prisma.area.update({
      where: { name: data.area },
      data: { status: Boolean(data.status) },
    });
  }

  res.status(200).json(areas);
};
