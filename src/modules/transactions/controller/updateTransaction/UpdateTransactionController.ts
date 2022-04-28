import { Request, Response } from 'express';
import {container} from "tsyringe"

import { UpdateTransactionService } from '../../services/UpdateTransactionService';

class UpdateTransactionController {
 
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      id, payment_status
    } = request.body;

    const updateTransactionService = container.resolve(UpdateTransactionService)

    await updateTransactionService.execute({
      id, payment_status
    });

    return response.status(201).send();
  }
}

export { UpdateTransactionController };