import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import VehicleODM from '../Models/VehicleODM';

class CarService {
  private createVehicleDomain(vehicle: ICar | null): Car | null {
    if (vehicle) {
      return new Car(
        // { 
        //   model: vehicle.model,
        //   year: vehicle.year,
        //   color: vehicle.color,
        //   status: vehicle.status,
        //   buyValue: vehicle.buyValue,
        //   doorsQty: vehicle.doorsQty,
        //   seatsQty: vehicle.seatsQty,
        // },
        vehicle,
      );
    }
    return null;
  }

  public async registerNewCar(car: ICar) {
    const vehicleODM = new VehicleODM();
    const newCar = await vehicleODM.create(car);
    // console.log(newCar);
    const test = this.createVehicleDomain(newCar);
    // console.log('test', test);
    
    return test;
  }
}

export default CarService;