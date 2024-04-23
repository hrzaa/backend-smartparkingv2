import express from "express";
import userController from "../controller/user-controller.js";
import parkingController from "../controller/parking-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
    userRouter.use(authMiddleware);

    // USER ROUTER
    userRouter.get("/api/user/get/:userId", userController.get);
    userRouter.patch("/api/user/update/:userId", userController.update);
    userRouter.delete("/api/user/logout/:userId", userController.logout);
    
    // userRouter.get("/api/parkings", parkingController.getAllParking);
    // userRouter.delete("/api/parkings/remove/:parkingId", parkingController.removeParking);


export {
    userRouter
}