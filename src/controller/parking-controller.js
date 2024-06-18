import parkingService from "../service/parking-service.js";

const parkingIn = async (req, res, next) => {
  try {
    const parking = req.body;
    const result = await parkingService.parkingIn(parking);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const parkingOut = async (req, res, next) => {
  try {
    const parking = req.body;
    // const transaction = req.params;
    const result = await parkingService.parkingOut(parking);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllParking = async (req, res, next) => {
  try {
    const result = await parkingService.getAllParking();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAllParkingById = async (req, res, next) => {
  try {
    const result = await parkingService.getAllParkingById(req.params.parkingId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const removeParking = async (req, res, next) => {
  try {
    const { parkingId } = req.params; // Asumsikan bahwa parkingId ada di req.params
    await parkingService.removeParking(parkingId);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    if (e.message === "Parking Code not found") {
      res.status(404).json({ error: e.message });
    } else {
      next(e);
    }
  }
};

// const getTransaction = async (req, res, next) => {
//   try {
//     const result = await parkingService.getTransaction();
//     res.status(200).json({
//       data: result,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

// const callback = async (req, res, next) => {
//   const { order_id, transaction_status } = req.query;
//   try {
//     const result = await parkingService.callback(order_id, transaction_status);
//     res.status(200).json({
//       data: result,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

// const trxNotif = async(req, res, next) => {
//   const data = req.body;
//   try {
//     res.status(200).json({
//       status: "success",
//       message: 'OK'
//     });
//   } catch (error) {
//     next(e);
//   }
// }

export default {
  parkingIn,
  parkingOut,
  getAllParking,
  getAllParkingById,
  removeParking,
  // getTransaction,
  // callback, 
  // trxNotif
};
