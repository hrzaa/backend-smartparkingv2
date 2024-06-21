import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { gateValidation } from "../validation/gate-validation.js";
import { ResponseError } from "../error/response-error.js";
import { request } from "express";

const gateIn = async (request) => {
  const { gateStatus } = request;
  let time = 1000;

  if (!gateStatus) {
    time = 1000;
  }

  // Kembalikan gate status ke false setelah detik
  setTimeout(async () => {
    await prismaClient.gates.update({
      where: { gatesName: "OPENGATE" },
      data: { gateStatus: gateStatus },
      select: { gatesId: true, gatesName: true, gateStatus: true },
    });
  }, time);
};

const gateOut = async(request)=>{
  const { gateStatus } = request;
  let time = 1000;

  // First update to true
  const updatedGate = await prismaClient.gates.update({
    where: { gatesName: "CLOSEGATE" },
    data: { gateStatus: gateStatus },
    select: { gatesId: true, gatesName: true, gateStatus: true },
  });

  // Schedule reversion to false after 5 seconds
  setTimeout(async () => {
    await prismaClient.gates.update({
      where: { gatesName: "CLOSEGATE" },
      data: { gateStatus: false },
      select: { gatesId: true, gatesName: true, gateStatus: true },
    });
  }, 10000);
   return updatedGate;
}

const getStatusGate = async (request) => {
  const gates = await prismaClient.gates.findMany();

  if (!gates) {
    throw new ResponseError(404, `Gates not found`);
  }

  return gates;
};

const getStatusOpenGate = async (request) => {
  const openGates = await prismaClient.gates.findUnique({
    where: {
      gatesId: "c8cf0348-f657-462d-baf6-3a9a5848517c",
    },
  });

  if (!openGates) {
    throw new ResponseError(404, `Gates not found`);
  }

  return openGates;
};

const getStatusCloseGate = async (request) => {
  const closeGates = await prismaClient.gates.findUnique({
    where: {
      gatesId: "475cb3c9-c6d0-4765-bc48-625919a022a7",
    },
  });

  if (!closeGates) {
    throw new ResponseError(404, `Gates not found`);
  }

  return closeGates;
};

const createGate = async (request) => {
  const { gatesName } = request; // Destruksi properti body dari request

  const processedGatesName = gatesName.replace(/\s+/g, "").toUpperCase();

  const existingGates = await prismaClient.gates.findUnique({
    where: {
      gatesName: processedGatesName,
    },
  });

  if (existingGates) {
    throw new ResponseError(`Gate with name "${gatesName}" already exists`);
  }

  return prismaClient.gates.create({
    data: {
      gatesName: processedGatesName,
    },
    select: {
      gatesId: true,
      gatesName: true,
      gateStatus: true,
    },
  });
};

const updateGate = async (request) => {
  const gate = validate(gateValidation, request);

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
      gatesId: true,
      gateStatus: true,
    },
  });
};

export default {
  getStatusGate,
  getStatusOpenGate,
  getStatusCloseGate,
  createGate,
  updateGate,
  gateIn,
  gateOut
};
