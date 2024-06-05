import areaService from "../service/area-service.js";

const create = async (req, res, next) => {
  try {
    const result = await areaService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await areaService.update(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAllArea = async (req, res, next) => {
  try {
    const result = await areaService.getAllArea();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  update,
  getAllArea,
};
