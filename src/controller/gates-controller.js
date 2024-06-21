import gatesService from "../service/gates-service.js";

const gateIn = async (req, res, next) => {
  try {
    const result = await gatesService.gateIn(req.body);
    // console.log(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const gateOut = async (req, res, next) => {
  try {
    const result = await gatesService.gateOut(req.body);
    // console.log(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

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

const getStatusOpenGate = async (req, res, next) => {
  try {
    const gate = req.params;
    const result = await gatesService.getStatusOpenGate(gate);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getStatusCloseGate = async (req, res, next) => {
  try {
    const gate = req.params;
    const result = await gatesService.getStatusCloseGate(gate);
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

export default {
  getStatusGate,
  getStatusOpenGate,
  getStatusCloseGate,
  createGate,
  updateGate,
  gateIn,
  gateOut,
};
