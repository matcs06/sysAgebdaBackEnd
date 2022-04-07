import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTransactionsService } from '../../services/ListTransactionsService';

class ListTransactionsController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {user_id} = request.query
    const listTransactionsService = container.resolve(ListTransactionsService)

    const all = await listTransactionsService.execute(String(user_id));

    return response.json(all);
  }
}

export { ListTransactionsController };
