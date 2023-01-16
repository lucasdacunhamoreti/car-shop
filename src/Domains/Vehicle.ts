import IVehicle from '../Interfaces/IVehicle';

class Vehicle {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;
  
  constructor(vehicleParameters: IVehicle) {
    this.id = vehicleParameters.id;
    this.model = vehicleParameters.model;
    this.year = vehicleParameters.year;
    this.color = vehicleParameters.color;
    this.status = vehicleParameters.status;
    this.buyValue = vehicleParameters.buyValue;
  }
}
  
export default Vehicle;