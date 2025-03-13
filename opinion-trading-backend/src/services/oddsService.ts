import Odds from "../models/oddsModel";
import logger from "../utils/logger";

export const storeOdds = async (oddsData: any[]) => {
  try {
    await Odds.insertMany(oddsData, { ordered: false });
    logger.info("Odds stored successfully");
  } catch (error) {
    logger.error("Error storing odds:", error);
    throw new Error("Error storing odds");
  }
};
