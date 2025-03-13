import { Request, Response } from "express";
import { fetchOdds } from "../services/apiService";
import { storeOdds } from "../services/oddsService";
import logger from "../utils/logger";

class OddsController {
  async fetchAndStoreOdds(req: Request, res: Response) {
    const { eventId } = req.params;

    try {
      const oddsData = await fetchOdds(eventId);
      await storeOdds(oddsData);
      res.status(200).json(oddsData); // Return the fetched odds data
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error fetching and storing odds",
          error: (error as Error).message,
        });
    }
  }
}

export const oddsController = new OddsController();
