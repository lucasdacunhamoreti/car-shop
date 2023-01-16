import {
  Model,
  Schema,
  models,
  model,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';
import StatusCode from '../Interfaces/StatusCode';
import HttpException from '../utils/HttpException';

abstract class AbstractODM<T> {
  private schema: Schema<T>;
  private _model: Model<T>;
  private modelName: string;
    
  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this._model = models[this.modelName] || model(this.modelName, this.schema);
  }

  protected get model(): Model<T> {
    return this._model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async findAll(): Promise<T[]> {
    return this._model.find();    
  }

  public async findById(id: string): Promise<T | null> {
    return this._model.findById(id);
  }

  public async update(_id: string, body: Partial<T>): Promise<T | null> {
    return this._model.findByIdAndUpdate(
      { _id },
      { ...body as UpdateQuery<T> },
      { new: true },
    );
  }

  public validateId(id: string): void {
    if (!isValidObjectId(id)) throw new HttpException('Invalid mongo id', StatusCode.UNPROCESSABLE);
  }
}

export default AbstractODM;