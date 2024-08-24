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
    apiRouter.get("/api/users", userController.all);
    apiRouter.get("/api/users/:userId", userController.get);
    apiRouter.patch("/api/users/:userId", userController.update);
    apiRouter.delete("/api/users/:userId", userController.logout);
    
    // PARKINGS
    apiRouter.get("/api/parkings", parkingController.getAllParking);
    apiRouter.get("/api/parkings/:parkingId", parkingController.getAllParkingById);
    apiRouter.delete("/api/parkings/:parkingId", parkingController.removeParking);

    // PRICE 
    apiRouter.get("/api/prices", priceController.getAllPrice);
    apiRouter.post("/api/prices", priceController.create);
    apiRouter.patch("/api/prices/:priceId", priceController.update);

    // GATES
    apiRouter.get("/api/gates", gatesController.getStatusGate);
    apiRouter.post("/api/gates/createGate", gatesController.createGate);
    apiRouter.patch("/api/gates/update/:gatesId", gatesController.updateGate);
    
    // TRANSACTIONS
    apiRouter.get("/api/sumTransactions", transactionController.sumTransactions);
    apiRouter.get("/api/transactions", transactionController.getTransaction);
    apiRouter.get("/api/transactions/:transactionId", transactionController.getTransactionById);
    apiRouter.patch("/api/transactions/:transactionId", transactionController.updateTransactionStatus);


export {
    apiRouter
}