import { Router } from 'express';
import {
	createAddressController,
	deleteAddressController,
	getAddressesController,
	updateAddressController,
} from '../Controllers/addressesController';

const router = Router();

router.get('/addresses', getAddressesController);
router.post('/addresses', createAddressController);
router.put('/addresses', updateAddressController);
router.delete('/addresses', deleteAddressController);

export default router;
