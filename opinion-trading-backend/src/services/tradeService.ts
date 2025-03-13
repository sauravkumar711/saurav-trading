import Trade from "../models/tradeModel";
import Event from "../models/eventModel";
import User from "../models/userModel";
import { TradeStatus } from "../models/tradeModel";

export const placeTrade = async (userId: string, tradeData: any) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const event = await Event.findById(tradeData.eventId);
  if (!event) {
    throw new Error("Event not found");
  }

  const trade = new Trade({ ...tradeData, user: userId });
  await trade.save();
  return trade;
};

export const getTradeDetails = async (tradeId: string) => {
  return Trade.findById(tradeId).populate("user event");
};

export const getAllTrades = async () => {
  return Trade.find().populate("user event");
};

export const settleTrade = async (tradeId: string, result: "won" | "lost") => {
  const trade = await Trade.findById(tradeId).populate("user event");
  if (!trade) {
    throw new Error("Trade not found");
  }

  // Update trade status and user balance based on the result
  if (result === "won") {
    trade.status = "won";
    trade.user.balance += trade.amount * trade.event.odds; // Payout based on odds
  } else {
    trade.status = "lost";
  }

  await trade.save();
  await trade.user.save();

  return trade;
};
