import sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';
import mockMotorcycle from './mocks/motocycleODM';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

describe('Testes na camada de service em motorcycles', function () {
  it('Deve cadastrar uma nova moto com sucesso', async function () {
    // Arrange
    const motorcycle = mockMotorcycle.motorcycles[0];

    const motorcycleOutput: Motorcycle = new Motorcycle(motorcycle as IMotorcycle);

    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.register(motorcycle as IMotorcycle);
    
    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);
    expect(result).to.be.instanceOf(Motorcycle);

    sinon.restore();
  });

  it('Deve falhar ao cadastrar uma moto sem as informações necessárias', async function () {
    // Arrange
    const motorcycle = mockMotorcycle.motorcycles[0];

    sinon.stub(Model, 'create').resolves(null);

    // Act
    const service = new MotorcycleService();
    const result = await service.register(motorcycle as IMotorcycle);
    
    // Assert
    expect(result).to.be.equal(null);

    sinon.restore();
  });

  it('Deve listar todos as motos com sucesso', async function () {
    // Arrange
    const { motorcycles } = mockMotorcycle;

    const motorcycleOutput = motorcycles.map(
      (motorcycle) => new Motorcycle(motorcycle as IMotorcycle),
    );

    sinon.stub(Model, 'find').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.findAll();
    
    // Assert
    expect(result).to.be.deep.equal(motorcycles);

    sinon.restore();
  });

  it('Deve listar uma moto por ID com sucesso', async function () {
    // Arrange
    const motorcycles = mockMotorcycle.motorcycles[0];

    const motorcycleOutput = new Motorcycle(motorcycles as IMotorcycle);

    sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.findById(motorcycles.id);
    
    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);

    sinon.restore();
  });

  it('Deve falhar ao tentar listar uma moto com ID inexistente', async function () {
    sinon.stub(Model, 'findById').resolves();

    try {
      const service = new MotorcycleService();
      await service.findById('634852326b35b59438fbea2f');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
    sinon.restore();
  });

  it('Deve atualizar uma moto por ID com sucesso', async function () {
    // Arrange

    const { motorcycleOld } = mockMotorcycle;

    const { motorcycleUpdated } = mockMotorcycle;
  
    const motorcycleOutput = new Motorcycle(motorcycleUpdated as IMotorcycle);

    sinon.stub(Model, 'findById').resolves(motorcycleOld);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);
  
    // Act
    const service = new MotorcycleService();
    const result = await service.update(motorcycleOld.id, motorcycleUpdated as IMotorcycle);
      
    // Assert
    expect(result).to.be.deep.equal(motorcycleUpdated);
  
    sinon.restore();
  });

  it('Deve falhar ao atualizar uma moto com ID inexistente', async function () {
    // Arrange

    const { motorcycleOld } = mockMotorcycle;

    const { motorcycleUpdated } = mockMotorcycle;
  
    sinon.stub(Model, 'findById').resolves();
    sinon.stub(Model, 'findByIdAndUpdate').resolves();
  
    try {
      const service = new MotorcycleService();
      await service.update(motorcycleOld.id, motorcycleUpdated as IMotorcycle);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
    sinon.restore();
  });
});