"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settleTrade = exports.getAllTrades = exports.getTradeDetails = exports.placeTrade = void 0;
const tradeModel_1 = __importDefault(require("../models/tradeModel"));
const eventModel_1 = __importDefault(require("../models/eventModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
// type TradeStatus = 'pending' | 'won' | 'lost' | 'settled';
const placeTrade = async (userId, tradeData) => {
    const user = await userModel_1.default.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const event = await eventModel_1.default.findById(tradeData.eventId);
    if (!event) {
        throw new Error('Event not found');
    }
    const trade = new tradeModel_1.default({ ...tradeData, user: userId });
    await trade.save();
    return trade;
};
exports.placeTrade = placeTrade;
const getTradeDetails = async (tradeId) => {
    return tradeModel_1.default.findById(tradeId).populate('user event');
};
exports.getTradeDetails = getTradeDetails;
const getAllTrades = async () => {
    return tradeModel_1.default.find().populate('user event');
};
exports.getAllTrades = getAllTrades;
const settleTrade = async (tradeId) => {
    const trade = await tradeModel_1.default.findById(tradeId);
    if (!trade) {
        throw new Error('Trade not found');
    }
    // Ensure 'settled' is part of the TradeStatus type
    trade.status = 'settled';
    await trade.save();
    return trade;
};
exports.settleTrade = settleTrade;
