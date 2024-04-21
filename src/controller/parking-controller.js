import parkingService from "../service/parking-service.js";

const parkingIn = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await parkingService.parkingIn(request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const parkingOut = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await parkingService.parkingOut(request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  parkingIn,
  parkingOut
};
