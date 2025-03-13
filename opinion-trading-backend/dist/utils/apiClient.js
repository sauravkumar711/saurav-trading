"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOdds = exports.fetchEvents = exports.fetchLiveScores = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchLiveScores = async () => {
    try {
        const response = await axios_1.default.get('https://api.example.com/live-scores');
        return response.data;
    }
    catch (error) {
        throw new Error('Error fetching live scores: ' + error.message); // Fix error type
    }
};
exports.fetchLiveScores = fetchLiveScores;
const fetchEvents = async () => {
    try {
        const response = await axios_1.default.get('https://api.example.com/events');
        return response.data;
    }
    catch (error) {
        throw new Error('Error fetching events: ' + error.message); // Fix error type
    }
};
exports.fetchEvents = fetchEvents;
const fetchOdds = async (eventId) => {
    try {
        const response = await axios_1.default.get(`https://api.example.com/events/${eventId}/odds`);
        return response.data;
    }
    catch (error) {
        throw new Error('Error fetching odds: ' + error.message); // Fix error type
    }
};
exports.fetchOdds = fetchOdds;
