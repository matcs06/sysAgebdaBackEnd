import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListScheduleByMonthAndYearService } from '../../services/ListSchedulesByMonthAndYearService';

class ListScheduleByMonthAndYearController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, schedule_date } = request.query
    const listScheduleService = container.resolve(ListScheduleByMonthAndYearService)

    const all = await listScheduleService.executebyMonthAndYear(String(user_id), String(schedule_date));

    return response.json(all);
  }
}

export { ListScheduleByMonthAndYearController };
