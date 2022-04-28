import { Request, Response } from 'express';
import {container} from "tsyringe"

import { UpdateScheduleService } from '../../services/UpdateScheduleService';

class UpdateScheduleController {
 
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      id, payment_status
    } = request.body;

    const updateScheduleService = container.resolve(UpdateScheduleService)

    await updateScheduleService.execute({
      id, payment_status
    });

    return response.status(201).send();
  }
}

export { UpdateScheduleController };