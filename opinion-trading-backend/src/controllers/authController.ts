import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: "user",
        balance: 0,
      });

      // Save the user to the database
      await newUser.save();

      // Return success response
      res
        .status(201)
        .json({
          message: "User registered successfully",
          user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
          },
        });
    } catch (error) {
      console.error("Registration Error:", error);
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error registering user", error: error.message });
      } else {
        res
          .status(500)
          .json({
            message: "Error registering user",
            error: "An unknown error occurred",
          });
      }
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          balance: user.balance,
        },
      });
    } catch (error) {
      console.error("Login Error:", error);
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error logging in", error: error.message });
      } else {
        res
          .status(500)
          .json({
            message: "Error logging in",
            error: "An unknown error occurred",
          });
      }
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const user = await User.findById(req.user?.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Profile Fetch Error:", error);
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error fetching profile", error: error.message });
      } else {
        res
          .status(500)
          .json({
            message: "Error fetching profile",
            error: "An unknown error occurred",
          });
      }
    }
  }
}

export const authController = new AuthController();
