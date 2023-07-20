import { Router } from 'express';
import {
	createTransactionController,
	getTransactionsByAssistantController,
	getTransactionsByCardNumberController,
} from '../Controllers/transactionsController';

const router = Router();

router.get('/transactions', getTransactionsByAssistantController);
router.get('/transactions/:cardNumber', getTransactionsByCardNumberController);
router.post('/transactions', createTransactionController);

export default router;
