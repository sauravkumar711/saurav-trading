import { Router } from 'express';
import { oddsController } from '../controllers/oddsController';

const router = Router();

router.get('/fetch-odds/:eventId', oddsController.fetchAndStoreOdds);

export default router;