import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.post(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).registerMotorcycle(),
);
  
routes.get(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).findAllMotorcycles(),
);
  
routes.get(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).findMotorcycleById(),
);
  
routes.put(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).updateMotorcycleById(),
);

export default routes;