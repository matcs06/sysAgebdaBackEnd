import { Request, Response } from 'express';
import {container} from "tsyringe"

import {  UpdateProductService} from '../../services/UpdateProductService';

class UpdateProductController {
 
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      name, description, price, duration,
    } = request.body;

    const {id} = request.params

    const updateProductService = container.resolve(UpdateProductService)

    await updateProductService.execute({
      id,name, price, description, duration,
    });

    return response.status(201).send();
  }
}

export { UpdateProductController };