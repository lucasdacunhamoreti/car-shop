import sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';
import mockCar from './mocks/carODM';

describe('Testes na camada de service em cars', function () {
  it('Deve cadastrar um novo carro com sucesso', async function () {
    // Arrange
    const car = mockCar.cars[0];

    const carOutput: Car = new Car(car);

    sinon.stub(Model, 'create').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.register(car);
    
    // Assert
    expect(result).to.be.deep.equal(carOutput);
    expect(result).to.be.instanceOf(Car);

    sinon.restore();
  });

  it('Deve falhar ao cadastrar um carro sem as informações necessárias', async function () {
    // Arrange
    const car = mockCar.cars[0];

    sinon.stub(Model, 'create').resolves(null);

    // Act
    const service = new CarService();
    const result = await service.register(car);
    
    // Assert
    expect(result).to.be.equal(null);

    sinon.restore();
  });

  it('Deve listar todos os carros com sucesso', async function () {
    // Arrange
    const { cars } = mockCar;

    const carsOutput = cars.map((car) => new Car(car));

    sinon.stub(Model, 'find').resolves(carsOutput);

    // Act
    const service = new CarService();
    const result = await service.findAll();
    
    // Assert
    expect(result).to.be.deep.equal(cars);

    sinon.restore();
  });

  it('Deve listar um carro por ID com sucesso', async function () {
    // Arrange
    const car = mockCar.cars[0];

    const carOutput = new Car(car);

    sinon.stub(Model, 'findById').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.findById(car.id);
    
    // Assert
    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('Deve falhar ao tentar listar um carro com ID inexistente', async function () {
    sinon.stub(Model, 'findById').resolves();

    try {
      const service = new CarService();
      await service.findById('634852326b35b59438fbea2f');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
    sinon.restore();
  });

  it('Deve atualizar um carro por ID com sucesso', async function () {
    // Arrange

    const { carOld } = mockCar;

    const { carUpdated } = mockCar;
  
    const carOutput = new Car(carUpdated);

    sinon.stub(Model, 'findById').resolves(carOld);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);
  
    // Act
    const service = new CarService();
    const result = await service.update(carOld.id, carUpdated);
      
    // Assert
    expect(result).to.be.deep.equal(carUpdated);
  
    sinon.restore();
  });

  it('Deve falhar ao atualizar um carro com ID inexistente', async function () {
    // Arrange

    const { carOld } = mockCar;

    const { carUpdated } = mockCar;
  
    // const carOutput = new Car(carUpdated);

    sinon.stub(Model, 'findById').resolves();
    sinon.stub(Model, 'findByIdAndUpdate').resolves();
  
    try {
      const service = new CarService();
      await service.update(carOld.id, carUpdated);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
    sinon.restore();
  });
});