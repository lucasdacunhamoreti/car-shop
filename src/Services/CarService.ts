import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import VehicleODM from '../Models/VehicleODM';

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
}

export default CarService;