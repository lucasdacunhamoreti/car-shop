import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import HttpException from '../utils/HttpException';
import StatusCode from '../Interfaces/StatusCode';

class CarService {
  private createVehicleDomain(vehicle: ICar | null): Car | null {
    if (vehicle) {
      return new Car(vehicle);
    }
    return null;
  }

  public async registerNewCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createVehicleDomain(newCar);
  }

  public async findAllCars() {
    const carODM = new CarODM();
    const carGroup = await carODM.findAll();
    const carsDomain = carGroup.map((obj) => this.createVehicleDomain(obj));
    
    return carsDomain;
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) throw new HttpException('Invalid mongo id', StatusCode.UNPROCESSABLE);

    const carODM = new CarODM();
    const carObj = await carODM.findById(id);

    if (!carObj) {
      throw new HttpException('Car not found', StatusCode.NOT_FOUND);
    }

    return this.createVehicleDomain(carObj);
  }
}

export default CarService;