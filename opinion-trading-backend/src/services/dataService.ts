import Event from "../models/eventModel";
import logger from "../utils/logger";

export const storeEvents = async (events: any[]) => {
  try {
    await Event.insertMany(events, { ordered: false });
    logger.info("Events stored successfully");
  } catch (error) {
    logger.error("Error storing events:", error);
    throw new Error("Error storing events");
  }
};
