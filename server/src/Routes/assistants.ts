import { Router } from 'express';
import {
	getAssistantsController,
	createAssistantController,
	updateAssistantController,
	deleteAssistantController,
} from '../Controllers/assistantsController';

const router = Router();

router.get('/assistants', getAssistantsController);
router.post('/assistants', createAssistantController);
router.put('/assistants', updateAssistantController);
router.delete('/assistants', deleteAssistantController);

export default router;
