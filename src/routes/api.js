import express from "express";
import userController from "../controller/user-controller.js";
import parkingController from "../controller/parking-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import priceController from "../controller/price-controller.js";
import gatesController from "../controller/gates-controller.js";
import transactionController from "../controller/transaction-controller.js";

const apiRouter = new express.Router();
    apiRouter.use(authMiddleware);

    // USER ROUTER
    apiRouter.get("/api/user/get/:userId", userController.get);
    apiRouter.get("/api/users/", userController.all);
    apiRouter.patch("/api/user/update/:userId", userController.update);
    apiRouter.delete("/api/user/logout/:userId", userController.logout);
    
    // PARKINGS
    apiRouter.delete("/api/parkings/remove/:parkingId", parkingController.removeParking);
    apiRouter.get("/api/parkings", parkingController.getAllParking);
    apiRouter.get("/api/parkings/:parkingId", parkingController.getAllParkingById);

    // PRICE 
    apiRouter.post("/api/price/create", priceController.create);
    apiRouter.patch("/api/price/update/:priceId", priceController.update);
    apiRouter.get("/api/prices", priceController.getAllPrice);

    // GATES
    apiRouter.get("/api/gates", gatesController.getStatusGate);
    apiRouter.post("/api/gates/createGate", gatesController.createGate);
    apiRouter.patch("/api/gates/update/:gatesId", gatesController.updateGate);

    
    // TRANSACTIONS
    apiRouter.get("/api/transactions/count", transactionController.sumPaidTransactions);


export {
    apiRouter
}