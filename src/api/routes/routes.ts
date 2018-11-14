import express, { Router } from 'express';
import { getCacheMiddleware } from '../middleware/routes.middleware';
import beerRoutes from './beer.routes';
import categoryRoutes from './category.routes';

const router: Router = express.Router();

// Root level before middlewares
router.use(getCacheMiddleware);

// Routes

router.use('/category', categoryRoutes);
router.use('/beer', beerRoutes);

// Root level after middlewares

export default router;
