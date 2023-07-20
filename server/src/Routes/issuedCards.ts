import { Router } from 'express';
import {
	deleteIssuedCardController,
	getAvailableBonusToWithdrawController,
	getIssuedCardController,
	getIssuedCardsController,
	issueCardController,
} from '../Controllers/issuedCardsController';

const router = Router();

router.get('/issuedCards', getIssuedCardsController);
router.get('/issuedCards/:id', getIssuedCardController);
router.post('/issuedCards', issueCardController);
router.post('/issuedCards/balance', getAvailableBonusToWithdrawController);
router.delete('/issuedCards', deleteIssuedCardController);

export default router;
