import express from "express";
import userController from "../controller/user-controller.js";
import parkingController from "../controller/parking-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const apiRouter = new express.Router();
    apiRouter.use(authMiddleware);

    // USER ROUTER
    apiRouter.get("/api/user/get/:userId", userController.get);
    apiRouter.patch("/api/user/update/:userId", userController.update);
    apiRouter.delete("/api/user/logout/:userId", userController.logout);
    
    // apiRouter.delete("/api/parkings/remove/:parkingId", parkingController.removeParking);
    apiRouter.get("/api/parkings", parkingController.getAllParking);


export {
    apiRouter
}