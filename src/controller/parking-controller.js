import parkingService from "../service/parking-service.js";

const parkingIn = async (req, res, next) => {
  try {
    const result = await parkingService.parkingIn(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const parkingOut = async (req, res, next) => {
  try {
    const result = await parkingService.parkingOut(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllParking = async(req, res, next) => {
  try {
    const result = await parkingService.getAllParking();
    res.status(200).json({
      data: result
    })
  } catch (e) {
    next(e)
  }
};

const removeParking = async (req, res, next) => {
  try {
    await parkingService.removeParking(req.params);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  parkingIn,
  parkingOut,
  getAllParking,
  removeParking

};
