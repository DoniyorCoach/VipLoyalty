import { Router } from 'express';
import { createManagerAndBusinessController } from '../Controllers/managersController';

const router = Router();

router.post('/managers', createManagerAndBusinessController);

export default router;
