import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { createAreaValidation } from "../validation/area-validation.js";


const create = async (request) => {
  const { areas } = request;
  await prismaClient.area.deleteMany({});

  for (const area of areas) {
    await prismaClient.area.create({ data: { area } });
  }

  return areas;

};

const update = async (request) => {
  const { areas } = request;

  for (const data of areas) {
    const area = await prismaClient.area.findFirst({
      where: { area: data.area },
    });
    await prismaClient.area.update({
      where: { areaId: area.areaId },
      data: { status: Boolean(data.status) },
    });
  }

  return areas;
};

const getAllArea = async (request) => {
 const areas = await prismaClient.area.findMany({
   orderBy: { area: "asc" },
 });

 if (!areas) throw new Error(404, "Area not found");

 return areas;
};

export default {
  create,
  update,
//   createnew,
  getAllArea,
};
