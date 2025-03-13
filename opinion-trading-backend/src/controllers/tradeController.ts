import { Request, Response } from "express";
import * as tradeService from "../services/tradeService";

class TradeController {
  async placeTrade(req: Request, res: Response) {
    try {
      const trade = await tradeService.placeTrade(req.user!.id, req.body);
      res.status(201).json(trade);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error placing trade",
          error: (error as Error).message,
        });
    }
  }

  async getTradeDetails(req: Request, res: Response) {
    try {
      const trade = await tradeService.getTradeDetails(req.params.id);
      res.json(trade);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error fetching trade details",
          error: (error as Error).message,
        });
    }
  }

  async getAllTrades(req: Request, res: Response) {
    try {
      const trades = await tradeService.getAllTrades();
      res.json(trades);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error fetching trades",
          error: (error as Error).message,
        });
    }
  }

  async settleTrade(req: Request, res: Response) {
    try {
      const trade = await tradeService.settleTrade(
        req.params.id,
        req.body.result
      );
      res.json(trade);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error settling trade",
          error: (error as Error).message,
        });
    }
  }
}

export const tradeController = new TradeController();
