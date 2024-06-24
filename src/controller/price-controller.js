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

const update = async (req, res, next) => {
  try {
    const { priceId } = req.params; // Extract priceId from URL parameters
    const { price } = req.body; // Extract price from request body

    // Validate the input
    if (!priceId || price === undefined) {
      throw new ResponseError(400, "Invalid priceId or price");
    }

    const result = await priceService.update({ priceId }, { price });
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
  update,
  getAllPrice,
};