import gatesService from "../service/gates-service.js";

const getStatusGate = async (req, res, next) => {
  try {
    const result = await gatesService.getStatusGate(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const createGate = async (req, res, next) => {
  try {
    const result = await gatesService.createGate(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateGate = async (req, res, next) => {
  try {
    const request = {
      gatesId: req.params.gatesId,
      gateStatus: req.body.gateStatus,
    };

    const result = await gatesService.updateGate(request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// const closeGate = async (req, res, next) => {
//   try {
//     const result = await gatesService.closeGate(req.body);
//     res.status(200).json({
//       data: result,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

export default {
  getStatusGate,  
  createGate,
  updateGate,
  // closeGate
};
