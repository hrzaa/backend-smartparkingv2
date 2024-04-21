import express from "express";
import userController from "../controller/user-controller.js";
import parkingController from "../controller/parking-controller.js";

const publicRouter = new express.Router();

// LOGIN RESGISTER API
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

// PARKING IN API
publicRouter.post("/api/parkings/in", parkingController.parkingIn);
publicRouter.post("/api/parkings/out", parkingController.parkingOut);

export {
    publicRouter
}