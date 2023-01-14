import sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Deveria cadastrar um novo carro', function () {
  it('Deve cadastrar um novo carro com sucesso', async function () {
    // Arrange
    const car = {
      id: 'f23qw-324532fsd-2135rfe',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carOutput: Car = new Car(car);

    sinon.stub(Model, 'create').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.registerNewCar(car);
    
    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });
});