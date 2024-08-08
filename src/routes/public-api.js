import express from "express";
import userController from "../controller/user-controller.js";
import parkingController from "../controller/parking-controller.js";
import transactionController from "../controller/transaction-controller.js";
import gatesController from "../controller/gates-controller.js";
// =========== ALDINI =============
import parkingAreaController from "../controller/parking-area-controller.js";
import { parking_middleware } from "../middleware/parking-middleware.js";
// =========== ALDINI =============

const publicRouter = new express.Router();

// LOGIN RESGISTER
publicRouter.post("/api/users/register", userController.register);
publicRouter.post("/api/users/login", userController.login);

// HANDLE NOTIFICATION FROM MIDTRANS
publicRouter.post("/api/transactions/notification", transactionController.trxNotif);

// PARKING
publicRouter.post("/api/parkings/in", parking_middleware, parkingController.parkingIn);
publicRouter.post("/api/parkings/out", parkingController.parkingOut);

// GATES
publicRouter.get("/api/gates/open", parking_middleware, gatesController.getStatusOpenGate);
publicRouter.get("/api/gates/close", gatesController.getStatusCloseGate);
publicRouter.post("/api/gates/in", gatesController.gateIn);

// =========== ALDINI =============
publicRouter.get(
  "/api/parking_areas",
  parking_middleware,
  parkingAreaController.getAllParkingAreas
);
publicRouter.post(
  "/api/parking_areas",
  parkingAreaController.updateParkingAreas
);
publicRouter.get(
  "/api/parking_spaces",
  parking_middleware,
  parkingAreaController.getAllParkingSpaces
);
publicRouter.post(
  "/api/parking_spaces",
  parkingAreaController.updateParkingSpaces
);
publicRouter.put(
  "/api/parking_images/:id",
  parkingAreaController.updateParkingImages
);
publicRouter.post(
  "/api/parking_areas/delete",
  parkingAreaController.deleteAllParkingAreas
);
// =========== ALDINI =============

export { publicRouter };
