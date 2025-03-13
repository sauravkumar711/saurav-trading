"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController"); // Fix import statement
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Fix import statement
const router = (0, express_1.Router)();
router.get('/', eventController_1.eventController.getAllEvents);
router.post('/', authMiddleware_1.authenticateToken, eventController_1.eventController.createEvent);
router.put('/:id', authMiddleware_1.authenticateToken, eventController_1.eventController.updateEvent);
router.delete('/:id', authMiddleware_1.authenticateToken, eventController_1.eventController.deleteEvent);
exports.default = router;
