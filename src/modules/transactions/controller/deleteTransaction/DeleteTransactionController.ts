import { Request, Response } from 'express';
import {container} from "tsyringe"

import { DeleteTransactionsService } from '../../services/DeleteTransactionService';

class DeleteTransactionsController {
 
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      id
    } = request.params;

    const deleteTransactionsService = container.resolve(DeleteTransactionsService)

    await deleteTransactionsService.execute(id);

    return response
      .status(200)
      .json({ message: 'Transaction successfully deleted!!' });
    
  }
}

export { DeleteTransactionsController };
