import { Router } from 'express';
import {
	getStatisticsForAdminController,
	getStatisticsForManagerController,
} from '../Controllers/statisticsController';

const router = Router();

router.get('/statistics/manager', getStatisticsForManagerController);
router.get('/statistics/admin', getStatisticsForAdminController);

export default router;
