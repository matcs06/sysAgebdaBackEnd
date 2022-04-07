import { Request, Response } from 'express';
import {container} from "tsyringe"

import { DeleteScheduleService } from '../../services/DeleteScheduleService';

class DeleteScheduleController {
 
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      id
    } = request.params;

    const deleteScheduleService = container.resolve(DeleteScheduleService)

    await deleteScheduleService.execute(id);

    return response
      .status(200)
      .json({ message: 'schedule successfully deleted!!' });
    
  }
}

export { DeleteScheduleController };