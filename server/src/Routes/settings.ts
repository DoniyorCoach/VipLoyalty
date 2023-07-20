import { Router } from 'express';
import { updatePasswordController } from '../Controllers/settingsController';

const router = Router();

router.put('/settings', updatePasswordController);

export default router;
