import express from "express";
import userController from "../controller/user-controller.js";
import parkingController from "../controller/parking-controller.js";
import transactionController from "../controller/transaction-controller.js";
import {
  getAllAreas,
  getAllMainAreas,
  createMainAreas,
  updateAllAreas,
} from "../controller/area-controller.js";
import gatesController from "../controller/gates-controller.js";

const publicRouter = new express.Router();

// LOGIN RESGISTER API
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/user/login", userController.login);

// TRANSACTION
publicRouter.get("/api/transactions", transactionController.getTransaction);
publicRouter.get("/api/transaction/:transactionId", transactionController.getTransactionById);
publicRouter.patch("/api/transaction/:transactionId", transactionController.updateTransactionStatus);
// HANDLE NOTIFICATION FROM MIDTRANS
publicRouter.post("/api/transaction/notification", transactionController.trxNotif);


// PARKING IN API
publicRouter.post("/api/parkings/in", parkingController.parkingIn);
publicRouter.post("/api/parkings/out", parkingController.parkingOut);

// PUNYA ALDINI
publicRouter.get("/api/mainareas", getAllMainAreas);
publicRouter.post("/api/mainareas", createMainAreas);

publicRouter.get("/api/areas", getAllAreas);
publicRouter.post("/api/areas", updateAllAreas);

publicRouter.get("/api/gates", gatesController.getStatusGate);
publicRouter.get("/api/opengates", gatesController.getStatusOpenGate);
publicRouter.get("/api/closegates", gatesController.getStatusCloseGate);
publicRouter.post("/api/gates/in", gatesController.gateIn);
publicRouter.post("/api/gates/createGate", gatesController.createGate);
publicRouter.patch("/api/gates/update/:gatesId", gatesController.updateGate);
// publicRouter.post("/api/gates/closeGate", gatesController.closeGate);

// publicRouter.get("/api/parkings/counts", parkingController.countAllParking);

export { publicRouter };
