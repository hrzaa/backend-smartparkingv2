import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.query.apiKey;

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role === "ADMIN") {
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ error: "Invalid role" });
    }
  } catch (err) {
    res.status(401).json({
      errors: "Unauthorized",
      message: err.message,
    });
  }
};
