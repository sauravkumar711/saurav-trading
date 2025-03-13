import axios from "axios";
import Event from "../models/eventModel";
import logger from "../utils/logger";

type EventStatus = "upcoming" | "live" | "completed";

export const getAllEvents = async () => {
  try {
    const response = await axios.get<{ events: any[] }>(
      "https://api.example.com/events"
    );
    return response.data.events; // Ensure response structure is correct
  } catch (error) {
    throw new Error("Error fetching live events: " + (error as Error).message);
  }
};

export const createEvent = async (eventData: Record<string, any>) => {
  const event = new Event(eventData);
  await event.save();
  return event;
};

export const getEventById = async (eventId: string) => {
  return Event.findById(eventId);
};

export const updateEventStatus = async (
  eventId: string,
  status: EventStatus
) => {
  if (!["upcoming", "live", "completed"].includes(status)) {
    throw new Error(`Invalid status: ${status}`);
  }

  return Event.findByIdAndUpdate(eventId, { status }, { new: true });
};

export const deleteEvent = async (eventId: string) => {
  return Event.findByIdAndDelete(eventId);
};

export const storeEvents = async (events: any[]) => {
  try {
    await Event.insertMany(events, { ordered: false });
    logger.info("Events stored successfully");
  } catch (error) {
    logger.error("Error storing events:", error);
    throw new Error("Error storing events");
  }
};
