import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { GateValidation } from "../validation/gate-validation.js";
import { ResponseError } from "../error/response-error.js";


const getStatusGate = async (request) => {
  const gates = await prismaClient.gates.findMany();

  if (!gates) {
    throw new Error(404, `Gates not found`);
  }

  return gates;
};

const createGate = async (request) => {
  const existingGates = await prismaClient.gates.count();

  if (existingGates == 1) {
    throw new Error(`Gates already exist`);
  }

  return prismaClient.gates.create({
    data: {
      gateStatus: false,
    },
    select: {
      gatesId: true,
      gateStatus: true,
    },
  });
};

const updateGate = async (request) => {
    const gate = validate(GateValidation, request);

    const existingGate = await prismaClient.gates.findUnique({
      where: {
        gatesId: gate.gatesId,
      },
    });

    if (!existingGate) {
      throw new ResponseError(404, "Gate not found");
    }

    return prismaClient.gates.update({
      where: {
        gatesId: gate.gatesId,
      },
      data: {
        gateStatus: gate.gateStatus,
      },
      select: {
        gatesId:true,
        gateStatus: true,
      },
    }); 
};

// const closeGate = async (request) => {
//   const existingGatesStatus = await prismaClient.gates.findFirst({
//     where: {
//       gateStatus: true,
//     },
//   });

//   if (existingGatesStatus) {
//     return prismaClient.gates.update({
//       where: {
//         gatesId: existingGatesStatus.gatesId,
//       },
//       data: {
//         gateStatus: false, // Mengatur gateStatus menjadi false
//       },
//       select: {
//         gatesId: true,
//         gateStatus: true,
//       },
//     });
//   }
// };


export default {
    getStatusGate,
    createGate,
    updateGate,
    // closeGate
};
