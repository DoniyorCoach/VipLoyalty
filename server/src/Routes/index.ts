import express from 'express';

import authenticationMiddleware from '../Middlewares/authenticationMiddleware';

import loyalties from './loyalties';
import issuedCards from './issuedCards';
import transactions from './transactions';
import credentials from './credentials';
import addresses from './addresses';
import assistants from './assistants';
import settings from './settings';
import applications from './applications';
import managers from './managers';
import customers from './customers';
import categories from './categories';
import statistics from './statistics';
import messages from './messages';
import chats from './chats';

const router = express();

router.use(credentials);
router.use(authenticationMiddleware, loyalties);
router.use(authenticationMiddleware, transactions);
router.use(authenticationMiddleware, issuedCards);
router.use(authenticationMiddleware, addresses);
router.use(authenticationMiddleware, assistants);
router.use(authenticationMiddleware, settings);
router.use(authenticationMiddleware, applications);
router.use(authenticationMiddleware, managers);
router.use(authenticationMiddleware, customers);
router.use(authenticationMiddleware, categories);
router.use(authenticationMiddleware, statistics);
router.use(authenticationMiddleware, messages);
router.use(authenticationMiddleware, chats);

export default router;
