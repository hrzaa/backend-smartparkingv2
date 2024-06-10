import parkingService from "../service/parking-service.js";

const parkingIn = async (req, res, next) => {
  try {
    const parking = req.body;
    // const gate = req.params;
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
    const transaction = req.params;
    const gate = req.params;
    const result = await parkingService.parkingOut(parking, transaction, gate);
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

export default {
  parkingIn,
  parkingOut,
  getAllParking,
  getAllParkingById,
  removeParking,
};
