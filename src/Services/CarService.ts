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

  public async registerCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createVehicleDomain(newCar);
  }

  public async findAllCars() {
    const carODM = new CarODM();
    const carGroup = await carODM.findAll();
    
    return carGroup.map((obj) => this.createVehicleDomain(obj));
  }

  public async findCarById(id: string) {
    const carODM = new CarODM();
    carODM.validateId(id);
    const carObj = await carODM.findById(id);

    if (!carObj) {
      throw new HttpException('Car not found', StatusCode.NOT_FOUND);
    }

    return this.createVehicleDomain(carObj);
  }

  public async updateCarById(id: string, body: ICar) {
    const carODM = new CarODM();
    carODM.validateId(id);
    const carObj = await carODM.findById(id);

    if (!carObj) {
      throw new HttpException('Car not found', StatusCode.NOT_FOUND);
    }

    const carUpdated = await carODM.update(id, body);

    return this.createVehicleDomain(carUpdated);
  }
}

export default CarService;