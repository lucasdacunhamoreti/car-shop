import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
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

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status ? this.req.body.status : false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    
    try {      
      const newMotorcycle = await this.service.registerMotorcycle(motorcycle);      
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {   
      const motorcyclesGroup = await this.service.findAllMotorcycles();      
      return this.res.status(200).json(motorcyclesGroup);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    try { 
      const { id } = this.req.params;
      const motorcyclesGroup = await this.service.findById(id);      
      return this.res.status(200).json(motorcyclesGroup);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById() {
    try { 
      const { id } = this.req.params;
      const { body } = this.req;
      const motorcycleUpdated = await this.service.updateById(id, body);      
      return this.res.status(200).json(motorcycleUpdated);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;