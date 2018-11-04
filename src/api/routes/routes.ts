import express, { Router } from 'express';
import beerRoutes from './beer.routes';
import categoryRoutes from './category.routes';

const router: Router = express.Router();

// Routes
router.use('/category', categoryRoutes);
router.use('/beer', beerRoutes);

export default router;
