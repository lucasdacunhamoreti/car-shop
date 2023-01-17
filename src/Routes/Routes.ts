import { Router } from 'express';
import CarRoute from './Car';
import MotorcycleRoute from './Motorcycle';

const router = Router();

router.use('/cars', CarRoute);
router.use('/motorcycles', MotorcycleRoute);

export default router;