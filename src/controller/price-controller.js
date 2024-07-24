import priceService from "../service/price-service.js";

const create = async (req, res, next) => {
 try {
   const userId = req.user.userId; // Ambil userId dari token JWT
   if (!userId) {
     throw new ResponseError(401, "User not authenticated");
   }

   const result = await priceService.create(req.body, userId);
   res.status(200).json({
     data: result,
   });
 } catch (e) {
   next(e);
 }
};

const update = async (req, res, next) => {
  try {
    const { priceId } = req.params; 
    const { price } = req.body; 

    if (!priceId || price === undefined) {
      throw new ResponseError(400, "Invalid priceId or price");
    }

    const userId = req.user.userId; // Ambil userId dari token JWT
    if (!userId) {
      throw new ResponseError(401, "User not authenticated");
    }

    const result = await priceService.update({ priceId }, { price }, userId);
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