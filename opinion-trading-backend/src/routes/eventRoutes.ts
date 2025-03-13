import { Router } from 'express';
import { eventController } from '../controllers/eventController'; 
import { authenticateToken } from '../middlewares/authMiddleware'; 

const router = Router();

router.get('/', eventController.getAllEvents);
router.post('/', authenticateToken, eventController.createEvent);
router.put('/:id', authenticateToken, eventController.updateEvent);
router.delete('/:id', authenticateToken, eventController.deleteEvent);

export default router;