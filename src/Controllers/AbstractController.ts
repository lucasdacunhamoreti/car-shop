/** 
 * @author Lucas da Cunha Moreti
 * @description Classe abstrata utilizada para implementar métodos do controlador.
 * @param S: Espera-se que seja passado um serviço.
 * 
 * @constructor 
 * Deve receber um parâmetro de serviço passado pela classe filha.
 * 
 * @method create(): Método deve criar entidades.
 * @method read(): Método deve ler as entidades.
 * @method update(): Método deve atualizar uma ententidade.
 * @method delete(): Método deve remover uma entidade.
*/

import { Request, Response } from 'express';

export default abstract class AbstractController<S> {
  req: Request;
  res: Response;
  service: S;

  constructor(service: S, req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = service;
  }

  /**
   * @return Retornar uma promise ao criar uma entidade.
  */
  abstract create(): Promise<Response | undefined>;

  /**
   * @return Retornar uma promise ao ler uma entidade.
  */
  abstract read(): Promise<Response | undefined>;

  /**
   * @return Retornar uma promise ao atualizar uma entidade.
  */
  abstract update(): Promise<Response | undefined>;
}