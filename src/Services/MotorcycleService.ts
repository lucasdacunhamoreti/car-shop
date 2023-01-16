// import { isValidObjectId } from 'mongoose';
import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import StatusCode from '../Interfaces/StatusCode';
import MotorcycleODM from '../Models/MotorcycleODM';
import HttpException from '../utils/HttpException';
// import HttpException from '../utils/HttpException';
// import StatusCode from '../Interfaces/StatusCode';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async registerMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAllMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const motorcyclesGroup = await motorcycleODM.findAll();
    const motorcycleDomain = motorcyclesGroup.map((obj) => this.createMotorcycleDomain(obj));
    
    return motorcycleDomain;
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) throw new HttpException('Invalid mongo id', StatusCode.UNPROCESSABLE);

    const motorcycleODM = new MotorcycleODM();
    const motorcycleObj = await motorcycleODM.findById(id);

    if (!motorcycleObj) {
      throw new HttpException('Motorcycle not found', StatusCode.NOT_FOUND);
    }

    return this.createMotorcycleDomain(motorcycleObj);
  }

  public async updateById(id: string, body: IMotorcycle) {
    if (!isValidObjectId(id)) throw new HttpException('Invalid mongo id', StatusCode.UNPROCESSABLE);

    const motorcycleODM = new MotorcycleODM();
    const motorcycleObj = await motorcycleODM.findById(id);

    if (!motorcycleObj) {
      throw new HttpException('Motorcycle not found', StatusCode.NOT_FOUND);
    }

    const motorcycleUpdated = await motorcycleODM.update(id, body);

    return this.createMotorcycleDomain(motorcycleUpdated);
  }
}

export default MotorcycleService;