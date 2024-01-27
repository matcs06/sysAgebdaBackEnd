import { Request, Response } from 'express';
import { container } from "tsyringe"
import { ICreateSchedulesDTO } from '../../repositories/ISchedulesRepository';

import { CreateSchedulesService } from '../../services/CreateScheduleService';

class CreateScheduleController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { customer_name,
      service, date,
      start_time,
      service_duration,
      phone_number,
      isMorning,
      price,
      user_id
    } = request.body;

    const createScheduleService = container.resolve(CreateSchedulesService)

    const data: ICreateSchedulesDTO = {
      customer_name,
      service, date,
      start_time,
      service_duration,
      phone_number,
      isMorning,
      price,
      user_id
    }

    await createScheduleService.execute(data);

    return response.status(201).send();
  }
}

export { CreateScheduleController };