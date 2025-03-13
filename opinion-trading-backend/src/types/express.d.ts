import { UserDocument } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}
