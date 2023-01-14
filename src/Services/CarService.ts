import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import VehicleODM from '../Models/VehicleODM';
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
    const vehicleODM = new VehicleODM();
    const newCar = await vehicleODM.create(car);
    return this.createVehicleDomain(newCar);
  }

  public async findAllCars() {
    const vehicleODM = new VehicleODM();
    const carGroup = await vehicleODM.findAll();
    const carsDomain = carGroup.map((obj) => this.createVehicleDomain(obj));
    
    return carsDomain;
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) throw new HttpException('Invalid mongo id', StatusCode.UNPROCESSABLE);

    const vehicleODM = new VehicleODM();
    const carObj = await vehicleODM.findById(id);

    if (!carObj) {
      throw new HttpException('Car not found', StatusCode.NOT_FOUND);
    }

    return this.createVehicleDomain(carObj);
  }
}

export default CarService;