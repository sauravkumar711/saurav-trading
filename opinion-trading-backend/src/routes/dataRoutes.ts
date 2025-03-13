import { Router } from 'express';
import { dataController } from '../controllers/dataController';

const router = Router();

router.get('/fetch-events', dataController.fetchAndStoreEvents);

export default router;