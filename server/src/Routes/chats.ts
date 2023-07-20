import { Router } from 'express';

import { getChatUserController, getChatsController } from '../Controllers/chatsController';

const router = Router();

router.get('/chats', getChatsController);
router.post('/chats/user', getChatUserController);

export default router;
