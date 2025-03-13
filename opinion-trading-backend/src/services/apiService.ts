import axios from "axios";
import Event from "../models/eventModel";

// Mock data for events
const mockEvents = [
  {
    name: "Football Match",
    sport: "Football",
    odds: 1.5,
    status: "upcoming",
  },
  {
    name: "Tennis Match",
    sport: "Tennis",
    odds: 2.0,
    status: "live",
  },
];

// Fetch events from an external API or use mock data
export const fetchEvents = async () => {
  try {
    // Uncomment the following lines to use a live API
    // const response = await axios.get('https://api.example.com/events');
    // return response.data;

    // Use mock data if the live API is unavailable
    return mockEvents;
  } catch (error) {
    throw new Error("Error fetching events: " + (error as Error).message);
  }
};

// Save fetched events to MongoDB
export const saveEventsToDB = async () => {
  try {
    const events = await fetchEvents();
    await Event.insertMany(events);
    console.log("Events saved to MongoDB");
  } catch (error) {
    throw new Error(
      "Error saving events to MongoDB: " + (error as Error).message
    );
  }
};

// Fetch live scores (mock implementation)
export const fetchLiveScores = async () => {
  try {
    // Uncomment the following lines to use a live API
    // const response = await axios.get('https://api.example.com/live-scores');
    // return response.data;

    // Mock live scores
    return [
      { event: "Football Match", score: "2-1" },
      { event: "Tennis Match", score: "6-4, 3-6" },
    ];
  } catch (error) {
    throw new Error("Error fetching live scores: " + (error as Error).message);
  }
};
