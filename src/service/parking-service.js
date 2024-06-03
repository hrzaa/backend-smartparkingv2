import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { 
    createParkingValidation, 
    updateParkingValidation,
    getParkingValidation
 } from "../validation/parking-validation.js";
import { transactionValidation } from "../validation/transaction-validation.js";

const parkingIn = async (request) => {
  const parking = validate(createParkingValidation, request);

  const existingParking = await prismaClient.parking.findFirst({
    where: {
      code: parking.code,
      status: "start",
    },
  });

  if (existingParking) {
    throw new Error(
      `Parking with code ${parking.code} is already in progress.`
    );
  }

  return prismaClient.parking.create({
    data: {
      code: parking.code,
      parkingin: parking.parkingin,
      parkingout: parking.parkingout,
      totaltime: parking.totaltime,
      status: "start",
    },
    select: {
      parkingId: true,
      code: true,
      parkingin: true,
      parkingout: true,
      status: true,
      totaltime: true,
    },
  });
};


const parkingOut = async (req1, req2) => {
    const parking = validate(updateParkingValidation, req1);
    // const transaction = validate(transactionValidation, req2);

    const dateUpdate = new Date();

    const countParking = await prismaClient.parking.findFirst({
        where: {
        code: parking.code,
        status: "start",
        },
    });

    if (!countParking) {
       throw new Error(
         `Parking with code ${parking.code} not found.`
       );
    }

    const timeIn = new Date(countParking.parkingin);
    const totalTimeInHours = (dateUpdate - timeIn) / (1000 * 60 * 60);

    const ratePerHour = 5000;
    let totalPrice = 0;

   if (totalTimeInHours === 0) {
     totalPrice = ratePerHour;
   } else if (totalTimeInHours > 0 && totalTimeInHours <= 12) {
     totalPrice = ratePerHour; // Tetap 5000 jika <= 12 jam
   } else if (totalTimeInHours > 12 && totalTimeInHours <= 24) {
     totalPrice = ratePerHour * 2; // 10000 jika antara 12 dan 24 jam
   } else {
     const extraDays = Math.ceil((totalTimeInHours - 24) / 24); // Hitung hari ekstra
     totalPrice = ratePerHour * (2 + extraDays); // 10000 untuk 24 jam pertama, tambah 10000 setiap 24 jam setelahnya
   }


    const updatedParking = await prismaClient.parking.update({
      where: {
        parkingId: countParking.parkingId,
      },
      data: {
        code: parking.code,
        parkingout: dateUpdate,
        totaltime: totalTimeInHours,
        status: "end",
      },
      select: {
        parkingId: true,
        code: true,
        parkingin: true,
        parkingout: true,
        status: true,
        totaltime: true,
      },
    });

     const createTransaction = await prismaClient.transaction.create({
       data: {
         parkingId: updatedParking.parkingId,
         totalprice: totalPrice,
         transactionstatus: "completed",
       },
       select: {
         transactionId: true,
         parkingId: true,
         totalprice: true,
         transactionstatus: true,
       },
     });

     return { updatedParking, createTransaction };
};

const getAllParking = async (request) => {
  const parkings = await prismaClient.parking.findMany({
    include: {
      transactions: true,
    },
    orderBy: {
      parkingin: "asc",
    },
  });

  if (!parkings) {
    throw new Error(404, `Parking Code not found`);
  }

  return parkings;
}

const getAllParkingById = async (id) => {
  // const { id } = request.params;
  const parkings = await prismaClient.parking.findUnique({
    where: {
      parkingId: id,
    },
    include: {
      transactions: true,
    },
  });

  if (!parkings) {
    throw new Error(404, `Parking Code not found`);
  }

  return parkings;
};


const removeParking = async (id) => {
  id = validate(getParkingValidation, id);

  const totalInDatabase = await prismaClient.parking.count({
    where: {
      id: id,
    },
  });

  if (totalInDatabase !== 1) {
    throw new Error(404, `Parking Code not found`);
  }

  return prismaClient.parking.delete({
    where: {
      id: id,
    }
  });
};


export default {
  parkingIn,
  parkingOut,
  getAllParking,
  getAllParkingById,
  removeParking
};