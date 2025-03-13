import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { tradeController } from '../controllers/tradeController';

const router = Router();

router.post('/', authenticateToken, tradeController.placeTrade);
router.get('/:id', authenticateToken, tradeController.getTradeDetails);
router.get('/', authenticateToken, tradeController.getAllTrades);
router.put('/:id/settle', authenticateToken, tradeController.settleTrade);

export default router;