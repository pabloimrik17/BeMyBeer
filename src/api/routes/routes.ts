import express, { Router } from 'express';
import { getCacheMiddleware } from '../middleware/routes.middleware';
import beerRoutes from './beer.routes';
import categoryRoutes from './category.routes';

const router: Router = express.Router();

// Root level middlewares
router.use(getCacheMiddleware);

// Routes
router.use('/category', getCacheMiddleware, categoryRoutes);
router.use('/beer', getCacheMiddleware, beerRoutes);

export default router;
