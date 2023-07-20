import { Router } from 'express';
import {
	createLoyaltyProgramController,
	deleteLoyaltyController,
	getLoyaltiesController,
	getLoyaltyController,
	getLoyaltyProgramController,
	getLoyaltyRecommendationsController,
	updateLoyaltyProgramController,
} from '../Controllers/loyaltiesController';

const router = Router();

router.get('/loyalties/program', getLoyaltyProgramController);
router.post('/loyalties/program', createLoyaltyProgramController);
router.put('/loyalties/program', updateLoyaltyProgramController);

router.get('/loyalties', getLoyaltiesController);
router.post('/loyalties/recommendations', getLoyaltyRecommendationsController);
router.get('/loyalties/:id', getLoyaltyController);
router.delete('/loyalties', deleteLoyaltyController);

export default router;
