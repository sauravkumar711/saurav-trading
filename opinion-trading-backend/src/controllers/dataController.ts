import { Request, Response } from "express";
import { fetchEvents, saveEventsToDB } from "../services/apiService";
import logger from "../utils/logger";

class DataController {
  async fetchAndStoreEvents(req: Request, res: Response) {
    try {
      await saveEventsToDB();
      res
        .status(200)
        .json({ message: "Events fetched and stored successfully" });
    } catch (error) {
      logger.error("Error fetching and storing events:", error);
      res
        .status(500)
        .json({
          message: "Error fetching and storing events",
          error: (error as Error).message,
        });
    }
  }
}

export const dataController = new DataController();
