import express from "express";
import userController from "../controller/user-controller.js";
import parkingController from "../controller/parking-controller.js";
import gatesController from "../controller/gates-controller.js";
// =========== ALDINI =============
import parkingAreaController from "../controller/parking-area-controller.js";
// =========== ALDINI =============

const publicRouter = new express.Router();

// LOGIN RESGISTER API
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/user/login", userController.login);

// PARKING IN API
publicRouter.post("/api/parkings/in", parkingController.parkingIn);
publicRouter.post("/api/parkings/out", parkingController.parkingOut);

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

publicRouter.get("/api/gates", gatesController.getStatusGate);
publicRouter.get("/api/opengates/:gatesId", gatesController.getStatusOpenGate);
publicRouter.get(
  "/api/closegates/:gatesId",
  gatesController.getStatusCloseGate
);
publicRouter.post("/api/gates/in", gatesController.gateIn);
publicRouter.post("/api/gates/createGate", gatesController.createGate);
publicRouter.patch("/api/gates/update/:gatesId", gatesController.updateGate);
// publicRouter.post("/api/gates/closeGate", gatesController.closeGate);

// publicRouter.get("/api/parkings/counts", parkingController.countAllParking);

export { publicRouter };
