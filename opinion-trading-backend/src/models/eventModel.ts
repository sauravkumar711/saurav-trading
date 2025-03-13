import mongoose, { Schema, Document } from "mongoose";

interface IEvent extends Document {
  name: string;
  sport: string;
  odds: number;
  status: "upcoming" | "live" | "completed";
  result?: string;
}

const eventSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    odds: { type: Number, required: true },
    status: {
      type: String,
      enum: ["upcoming", "live", "completed"],
      required: true,
    },
    result: { type: String },
  },
  { timestamps: true }
);

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
