import { NextFunction, Response, Request } from 'express';
import ICar from '../Interfaces/ICar';
import StatusCode from '../Interfaces/StatusCode';
import CarService from '../Services/CarService';
import AbstractController from './AbstractController';

export default class CarController extends AbstractController<CarService> {
  next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(new CarService(), req, res);
    this.next = next;
  }

  async create(): Promise<Response> {
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = this.req.body;

    const car: ICar = {
      model,
      year,
      color,
      status: status || false,
      buyValue,
      doorsQty,
      seatsQty,
    };
    
    try {      
      const newCar = await this.service.register(car);      
      return this.res.status(StatusCode.CREATED).json(newCar);
    } catch (error) {
      return this.res.json(this.next(error));
    }
  }

  async read(): Promise<Response | undefined> {
    try {   
      const { id } = this.req.params;
      if (id) {
        const carJson = await this.service.findById(id);      
        return this.res.status(StatusCode.OK).json(carJson);
      }
      const carGroup = await this.service.findAll();      
      return this.res.status(StatusCode.OK).json(carGroup);
    } catch (error) {
      this.next(error);
    }
  }

  async update(): Promise<Response | undefined> {
    try { 
      const { id } = this.req.params;
      const { body } = this.req;
      const carUpdated = await this.service.update(id, body);      
      return this.res.status(StatusCode.OK).json(carUpdated);
    } catch (error) {
      this.next(error);
    }
  }
}