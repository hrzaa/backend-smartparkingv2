import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { createAreaValidation } from "../validation/area-validation.js";

const create = async (request) => {
 const { area } = request;

 const areas = await Promise.all(
   area.map(async (area) => {
     // Membuat atau menyimpan data area ke dalam database
     const createdArea = await prismaClient.area.create({
       data: {
         area: area,
       },
       select: {
         areaId: true,
         area: true,
       },
     });

     return createdArea;
   })
 );

 return areas;
};

const getAllArea = async (request) => {
  const areas = await prismaClient.area.findMany();

  if (!areas) {
    throw new Error(404, `Areas not found`);
  }

  return areas;
};

export default {
  create,
  getAllArea,
};
