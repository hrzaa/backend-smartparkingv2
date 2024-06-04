import priceService from "../service/price-service.js";

const create = async (req, res, next) => {
  try {
    const result = await priceService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAllPrice = async (req, res, next) => {
  try {
    const result = await priceService.getAllPrice();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  getAllPrice,
};