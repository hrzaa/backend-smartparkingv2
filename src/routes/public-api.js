import express from "express";
import userController from "../controller/user-controller.js";
import parkingController from "../controller/parking-controller.js";
import areaController from "../controller/area-controller.js";


const publicRouter = new express.Router();

// LOGIN RESGISTER API
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/user/login", userController.login);

// PARKING IN API
publicRouter.post("/api/parkings/in", parkingController.parkingIn);
publicRouter.post("/api/parkings/out", parkingController.parkingOut);

publicRouter.post("/api/area/create", areaController.create);
publicRouter.post("/api/area/update", areaController.update);
publicRouter.get("/api/areas", areaController.getAllArea);


// publicRouter.get("/api/parkings/counts", parkingController.countAllParking);

export {
    publicRouter
}