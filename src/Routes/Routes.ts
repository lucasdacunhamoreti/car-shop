import { Router } from 'express';
import CarRoute from './Car';
import MotorcycleRoute from './Motorcycle';

const routes = Router();

routes.use('/cars', CarRoute);

routes.use('/motorcycles', MotorcycleRoute);

export default routes;