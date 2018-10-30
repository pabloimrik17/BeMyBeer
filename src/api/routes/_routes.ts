import express, { Router } from 'express';
import beerRouter from './_beer.routes';
import categoryRouter from './_category.routes';

const router: Router = express.Router();

// Routes
router.use('/category', categoryRouter);
router.use('/beer', beerRouter);

export default router;