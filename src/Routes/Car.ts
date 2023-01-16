import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

routes.post('/', (req, res, next) => new CarController(req, res, next).registerCar());

routes.get('/', (req, res, next) => new CarController(req, res, next).findAllCars());

routes.get('/:id', (req, res, next) => new CarController(req, res, next).findCarById());

routes.put('/:id', (req, res, next) => new CarController(req, res, next).updateCarById());

export default routes;