import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Not authorized, no token" });

    const decoded = jwt.verify(token, process.env.JWTPRIVATE_KEY);
    req.user = await User.findById(decoded.id)
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
