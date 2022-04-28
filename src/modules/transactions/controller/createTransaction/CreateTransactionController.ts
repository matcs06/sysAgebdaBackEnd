import { Request, Response } from 'express';
import {container} from "tsyringe"

import { CreateTransactionService } from '../../services/CreateTransactionService';

class CreateTransactionController {
 
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      title, formatedDate, value, payment_status, user_id
    } = request.body;

    const createTransactionService = container.resolve(CreateTransactionService)

    await createTransactionService.execute({
      title, formatedDate, value, payment_status, user_id
    });

    return response.status(201).send();
  }
}

export { CreateTransactionController };