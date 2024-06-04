import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { createAreaValidation } from "../validation/area-validation.js";


const create = async (request) => {
  const { area } = request;

  // Menghapus area yang sudah ada sebelum membuat area baru
  await prismaClient.area.deleteMany();

  const areas = await Promise.all(
    area.map(async (areaName) => {
      // Membuat area baru
      const createdArea = await prismaClient.area.create({
        data: {
          area: areaName,
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


// const create = async (request) => {
//   const { area } = request;

//   const areas = await Promise.all(
//     area.map(async (areaName) => {
//       // Mencari data area berdasarkan nama
//       const existingArea = await prismaClient.area.findUnique({
//         where: {
//           area: areaName,
//         },
//       });

//       if (existingArea) {
//         // Jika area sudah ada, lakukan update
//         const updatedArea = await prismaClient.area.update({
//           where: {
//             areaId: existingArea.areaId,
//           },
//           data: {
//             area: areaName,
//           },
//           select: {
//             areaId: true,
//             area: true,
//           },
//         });

//         return updatedArea;
//       } else {
//         // Jika area belum ada, buat area baru
//         const createdArea = await prismaClient.area.create({
//           data: {
//             area: areaName,
//           },
//           select: {
//             areaId: true,
//             area: true,
//           },
//         });

//         return createdArea;
//       }
//     })
//   );

//   return areas;
// };

// const update = async (request) => {
//   const { area } = request;

//   const areas = await Promise.all(
//     area.map(async (area) => {
//       // Membuat atau menyimpan data area ke dalam database
//       const createdArea = await prismaClient.area.create({
//         data: {
//           area: area,
//         },
//         select: {
//           areaId: true,
//           area: true,
//         },
//       });

//       return createdArea;
//     })
//   );

//   return areas;
// };

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
