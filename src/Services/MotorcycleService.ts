import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import StatusCode from '../Interfaces/StatusCode';
import MotorcycleODM from '../Models/MotorcycleODM';
import HttpException from '../utils/HttpException';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async register(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcyclesGroup = await motorcycleODM.findAll();
    const motorcycleDomain = motorcyclesGroup.map((obj) => this.createMotorcycleDomain(obj));
    
    return motorcycleDomain;
  }

  public async findById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    motorcycleODM.validateId(id);
    const motorcycleObj = await motorcycleODM.findById(id);

    if (!motorcycleObj) {
      throw new HttpException('Motorcycle not found', StatusCode.NOT_FOUND);
    }

    return this.createMotorcycleDomain(motorcycleObj);
  }

  public async update(id: string, body: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    motorcycleODM.validateId(id);
    const motorcycleObj = await motorcycleODM.findById(id);

    if (!motorcycleObj) {
      throw new HttpException('Motorcycle not found', StatusCode.NOT_FOUND);
    }

    const motorcycleUpdated = await motorcycleODM.update(id, body);

    return this.createMotorcycleDomain(motorcycleUpdated);
  }
}

export default MotorcycleService;