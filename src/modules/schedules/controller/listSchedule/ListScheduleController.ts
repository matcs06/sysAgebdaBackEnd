import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListScheduleService } from '../../services/ListScheduleService';

class ListScheduleController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {user_id} = request.query
    const listScheduleService = container.resolve(ListScheduleService)

    const all = await listScheduleService.execute(String(user_id));

    return response.json(all);
  }
}

export { ListScheduleController };
