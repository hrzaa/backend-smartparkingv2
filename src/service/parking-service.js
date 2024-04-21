import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { 
    createParkingValidation, 
    updateParkingValidation
 } from "../validation/parking-validation.js";

const parkingIn = async (request) => {
  const parking = validate(createParkingValidation, request);

  return prismaClient.parking.create({
    data: {
        code : parking.code,
        parkingin : parking.parkingin,
        parkingout : parking.parkingout,
        totaltime : parking.totaltime,
        status : "start",
        // status : status,
    },
    select: {
      id: true,
      code: true,
      parkingin: true,
      parkingout: true,
      status: true,
      totaltime: true,
    },
  });
};


const parkingOut = async (request) => {
    const parking = validate(updateParkingValidation, request);
    const dateUpdate = new Date();

    const countParking = await prismaClient.parking.findFirst({
        where: {
        code: parking.code,
        status: "start",
        },
    });

    if (!countParking) {
        throw new ResponseError(404, "Parking Code not found");
    }

    const timeIn = new Date(countParking.parkingin);
    const totalTimeInMinutes = Math.floor(
        (dateUpdate - timeIn) / (1000 * 60)
    );

    return prismaClient.parking.update({
      where: {
        id: countParking.id,
      },
      data: {
        code: parking.code,
        parkingout: dateUpdate,
        totaltime: totalTimeInMinutes,
        status: "end",
      },
      select: {
        id: true,
        code: true,
        parkingin: true,
        parkingout: true,
        status: true,
        totaltime: true,
      },
    });
};


export default {
  parkingIn,
  parkingOut
};