import { Router } from 'express';
import authenticationMiddleware from '../Middlewares/authenticationMiddleware';
import {
	authenticationController,
	authorizationController,
	registrationController,
} from '../Controllers/credentialsController';
import { createB2bApplicationController } from '../Controllers/applicationsController';

const router = Router();

router.post('/registration', registrationController);
router.post('/authorization', authorizationController);
router.get('/authentication', authenticationMiddleware, authenticationController);
router.post('/b2b', createB2bApplicationController);

export default router;
