import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  balance: number;
  trades: Schema.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    balance: { type: Number, default: 0 },
    trades: [{ type: Schema.Types.ObjectId, ref: "Trade" }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
