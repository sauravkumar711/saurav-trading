import mongoose, { Schema, Document } from "mongoose";

export type TradeStatus = "pending" | "won" | "lost" | "settled";
interface ITrade extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  amount: number;
  choice: string;
  status: TradeStatus;
}

const tradeSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Event",
      index: true,
    },
    amount: { type: Number, required: true, min: 0 },
    choice: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "won", "lost", "settled"],
      default: "pending",
    }, // Add 'settled'
  },
  { timestamps: true }
);

const Trade = mongoose.model<ITrade>("Trade", tradeSchema);

export default Trade;
