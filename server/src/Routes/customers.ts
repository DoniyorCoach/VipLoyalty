import { Router } from 'express';
import {
	getCustomerController,
	updateCustomerController,
} from '../Controllers/customersController';

const router = Router();

router.get('/customers', getCustomerController);
router.put('/customers', updateCustomerController);

export default router;
