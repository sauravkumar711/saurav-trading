import { Request, Response } from "express";
import * as eventService from "../services/eventService"; // Fix import statement

class EventController {
  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await eventService.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events", error });
    }
  }

  async createEvent(req: Request, res: Response) {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ message: "Error creating event", error });
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const event = await eventService.updateEventStatus(
        req.params.id,
        req.body.status
      );
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Error updating event", error });
    }
  }

  async deleteEvent(req: Request, res: Response) {
    try {
      await eventService.deleteEvent(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting event", error });
    }
  }
}

export const eventController = new EventController();
