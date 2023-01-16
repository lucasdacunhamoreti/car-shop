import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(carParameters: ICar) {
    super(carParameters);
    this.doorsQty = carParameters.doorsQty;
    this.seatsQty = carParameters.seatsQty;
  }
}

export default Car;