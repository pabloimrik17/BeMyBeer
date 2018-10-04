import express, {Router} from 'express'
import categoryRouter from './_category.routes'
import beerRouter from './_beer.routes'

const router: Router = express.Router();

// Routes
router.use('/category', categoryRouter)
router.use('/beer', beerRouter)

export default router