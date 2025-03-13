"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeController = void 0;
const tradeService = __importStar(require("../services/tradeService")); // Fix import statement
class TradeController {
    async placeTrade(req, res) {
        try {
            const trade = await tradeService.placeTrade(req.user.id, req.body);
            res.status(201).json(trade);
        }
        catch (error) {
            res.status(500).json({ message: 'Error placing trade', error: error.message }); // Fix error type
        }
    }
    async getTradeDetails(req, res) {
        try {
            const trade = await tradeService.getTradeDetails(req.params.id);
            res.json(trade);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching trade details', error: error.message }); // Fix error type
        }
    }
    async getAllTrades(req, res) {
        try {
            const trades = await tradeService.getAllTrades();
            res.json(trades);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching trades', error: error.message }); // Fix error type
        }
    }
    async settleTrade(req, res) {
        try {
            const trade = await tradeService.settleTrade(req.params.id);
            res.json(trade);
        }
        catch (error) {
            res.status(500).json({ message: 'Error settling trade', error: error.message }); // Fix error type
        }
    }
}
exports.tradeController = new TradeController();
