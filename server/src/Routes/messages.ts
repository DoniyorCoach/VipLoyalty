import { Router } from 'express';

import {
	createMessageController,
	getMessagesController,
	setMessagesReadController,
} from '../Controllers/messagesController';

const router = Router();

router.get('/messages', getMessagesController);
router.post('/messages', createMessageController);
router.post('/messages/read', setMessagesReadController);

export default router;
