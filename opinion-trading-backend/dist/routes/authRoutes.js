"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Fix import statement
const eventController_1 = require("../controllers/eventController");
const tradeController_1 = require("../controllers/tradeController");
const router = (0, express_1.Router)();
// Admin routes for managing events
router.get('/events', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRoles)(['admin']), eventController_1.eventController.getAllEvents);
router.post('/events', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRoles)(['admin']), eventController_1.eventController.createEvent);
router.put('/events/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRoles)(['admin']), eventController_1.eventController.updateEvent);
router.delete('/events/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRoles)(['admin']), eventController_1.eventController.deleteEvent);
// Admin routes for managing trades
router.get('/trades', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRoles)(['admin']), tradeController_1.tradeController.getAllTrades);
router.get('/trades/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRoles)(['admin']), tradeController_1.tradeController.getTradeDetails);
router.put('/trades/:id/settle', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRoles)(['admin']), tradeController_1.tradeController.settleTrade);
exports.default = router;
