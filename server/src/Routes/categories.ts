import { Router } from 'express';
import { getCategoriesController } from '../Controllers/categoriesController';

const router = Router();

router.get('/categories', getCategoriesController);

export default router;
