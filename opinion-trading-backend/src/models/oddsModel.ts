import mongoose, { Schema, Document } from "mongoose";

interface IOdds extends Document {
  eventId: mongoose.Types.ObjectId;
  market: string;
  odds: number;
  timestamp: Date;
}

const oddsSchema: Schema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    market: { type: String, required: true },
    odds: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Odds = mongoose.model<IOdds>("Odds", oddsSchema);

export default Odds;
