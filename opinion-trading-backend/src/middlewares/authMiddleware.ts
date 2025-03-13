import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

declare module "express" {
  export interface Request {
    user?: { id: string; role: string };
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    // Find the user by ID
    const user = await User.findById(decodedUser.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user information to the request object
    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

export const authorizeRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if the user has the required role
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};
