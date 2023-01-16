import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import StatusCode from '../Interfaces/StatusCode';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async registerMotorcycle() {
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
      const newMotorcycle = await this.service.registerMotorcycle(motorcycle);      
      return this.res.status(StatusCode.CREATED).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAllMotorcycles() {
    try {   
      const motorcycleGroup = await this.service.findAllMotorcycles();      
      return this.res.status(StatusCode.OK).json(motorcycleGroup);
    } catch (error) {
      this.next(error);
    }
  }

  public async findMotorcycleById() {
    try { 
      const { id } = this.req.params;
      const motorcycleObj = await this.service.findMotorcycleById(id);      
      return this.res.status(StatusCode.OK).json(motorcycleObj);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateMotorcycleById() {
    try { 
      const { id } = this.req.params;
      const { body } = this.req;
      const motorcycleUpdated = await this.service.updateMotorcycleById(id, body);      
      return this.res.status(StatusCode.OK).json(motorcycleUpdated);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;