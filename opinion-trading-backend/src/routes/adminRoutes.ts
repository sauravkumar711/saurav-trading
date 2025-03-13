import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';
import { eventController } from '../controllers/eventController';
import { tradeController } from '../controllers/tradeController';

const router = Router();

// Admin routes for managing events
router.get('/events', authenticateToken, authorizeRoles(['admin']), eventController.getAllEvents);
router.post('/events', authenticateToken, authorizeRoles(['admin']), eventController.createEvent);
router.put('/events/:id', authenticateToken, authorizeRoles(['admin']), eventController.updateEvent);
router.delete('/events/:id', authenticateToken, authorizeRoles(['admin']), eventController.deleteEvent);

// Admin routes for managing trades
router.get('/trades', authenticateToken, authorizeRoles(['admin']), tradeController.getAllTrades);
router.get('/trades/:id', authenticateToken, authorizeRoles(['admin']), tradeController.getTradeDetails);
router.put('/trades/:id/settle', authenticateToken, authorizeRoles(['admin']), tradeController.settleTrade);

export { router as adminRoutes };