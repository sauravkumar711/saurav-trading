"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEventStatus = exports.getEventById = exports.createEvent = exports.getAllEvents = void 0;
const axios_1 = __importDefault(require("axios"));
const eventModel_1 = __importDefault(require("../models/eventModel"));
const getAllEvents = async () => {
    try {
        const response = await axios_1.default.get('https://api.example.com/events');
        return response.data.events; // Ensure response structure is correct
    }
    catch (error) {
        throw new Error('Error fetching live events: ' + error.message);
    }
};
exports.getAllEvents = getAllEvents;
const createEvent = async (eventData) => {
    const event = new eventModel_1.default(eventData);
    await event.save();
    return event;
};
exports.createEvent = createEvent;
const getEventById = async (eventId) => {
    return eventModel_1.default.findById(eventId);
};
exports.getEventById = getEventById;
const updateEventStatus = async (eventId, status) => {
    if (!['upcoming', 'live', 'completed'].includes(status)) {
        throw new Error(`Invalid status: ${status}`);
    }
    return eventModel_1.default.findByIdAndUpdate(eventId, { status }, { new: true });
};
exports.updateEventStatus = updateEventStatus;
const deleteEvent = async (eventId) => {
    return eventModel_1.default.findByIdAndDelete(eventId);
};
exports.deleteEvent = deleteEvent;
