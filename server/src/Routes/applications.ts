import { Router } from 'express';
import {
	completeApplicationsController,
	createApplicationController,
	getApplicationController,
	getApplicationsController,
} from '../Controllers/applicationsController';

const router = Router();

router.get('/applications', getApplicationsController);
router.get('/applications/:id', getApplicationController);
router.put('/applications', completeApplicationsController);
router.post('/applications', createApplicationController);

export default router;
