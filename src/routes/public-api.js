import express from "express";
import userController from "../controller/user-controller.js";
import parkingController from "../controller/parking-controller.js";
import transactionController from "../controller/transaction-controller.js";
import gatesController from "../controller/gates-controller.js";
// =========== ALDINI =============
import parkingAreaController from "../controller/parking-area-controller.js";
// =========== ALDINI =============

const publicRouter = new express.Router();

// LOGIN RESGISTER
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/user/login", userController.login);

// TRANSACTION
publicRouter.get("/api/transactions", transactionController.getTransaction);
publicRouter.get("/api/transaction/:transactionId", transactionController.getTransactionById);
publicRouter.patch("/api/transaction/:transactionId", transactionController.updateTransactionStatus);
// HANDLE NOTIFICATION FROM MIDTRANS
publicRouter.post("/api/transaction/notification", transactionController.trxNotif);

// PARKING
publicRouter.post("/api/parkings/in", parkingController.parkingIn);
publicRouter.post("/api/parkings/out", parkingController.parkingOut);

// GATES 
publicRouter.get("/api/gates", gatesController.getStatusGate);
publicRouter.get("/api/opengates", gatesController.getStatusOpenGate);
publicRouter.get("/api/closegates", gatesController.getStatusCloseGate);
publicRouter.post("/api/gates/in", gatesController.gateIn);
publicRouter.post("/api/gates/createGate", gatesController.createGate);
publicRouter.patch("/api/gates/update/:gatesId", gatesController.updateGate);

// =========== ALDINI =============
publicRouter.get(
  "/api/parking_areas",
  parkingAreaController.getAllParkingAreas
);
publicRouter.post(
  "/api/parking_areas",
  parkingAreaController.updateParkingAreas
);
publicRouter.post(
  "/api/parking_areas/delete",
  parkingAreaController.deleteAllParkingAreas
);
publicRouter.get(
  "/api/parking_spaces",
  parkingAreaController.getAllParkingSpaces
);
publicRouter.post(
  "/api/parking_spaces",
  parkingAreaController.updateParkingSpaces
);
// =========== ALDINI =============


export { publicRouter };
