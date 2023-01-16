import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import StatusCode from '../Interfaces/StatusCode';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async registerCar() {
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
      const newCar = await this.service.registerCar(car);      
      return this.res.status(StatusCode.CREATED).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAllCars() {
    try {   
      const carGroup = await this.service.findAllCars();      
      return this.res.status(StatusCode.OK).json(carGroup);
    } catch (error) {
      this.next(error);
    }
  }

  public async findCarById() {
    try { 
      const { id } = this.req.params;
      const carObj = await this.service.findCarById(id);      
      return this.res.status(StatusCode.OK).json(carObj);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateCarById() {
    try { 
      const { id } = this.req.params;
      const { body } = this.req;
      const carUpdated = await this.service.updateCarById(id, body);      
      return this.res.status(StatusCode.OK).json(carUpdated);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;