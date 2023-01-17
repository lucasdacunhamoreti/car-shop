import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import StatusCode from '../Interfaces/StatusCode';
import MotorcycleService from '../Services/MotorcycleService';
import AbstractController from './AbstractController';

export default class MotorcycleController extends AbstractController<MotorcycleService> {
  next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(new MotorcycleService(), req, res);
    this.next = next;
  }

  public async create(): Promise<Response | undefined> {
    const { model, year, color, status, buyValue, category, engineCapacity } = this.req.body;
    
    const motorcycle: IMotorcycle = {
      model,
      year,
      color,
      status: status || false,
      buyValue,
      category,
      engineCapacity,
    };
    
    try {      
      const newMotorcycle = await this.service.register(motorcycle);      
      return this.res.status(StatusCode.CREATED).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async read(): Promise<Response | undefined> {
    try {
      const { id } = this.req.params;
      if (id) {
        const motorcycleJson = await this.service.findById(id);      
        return this.res.status(StatusCode.OK).json(motorcycleJson);
      }
      const motorcycleGroup = await this.service.findAll();      
      return this.res.status(StatusCode.OK).json(motorcycleGroup);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    try { 
      const { id } = this.req.params;
      const { body } = this.req;
      const motorcycleUpdated = await this.service.update(id, body);      
      return this.res.status(StatusCode.OK).json(motorcycleUpdated);
    } catch (error) {
      this.next(error);
    }
  }
}