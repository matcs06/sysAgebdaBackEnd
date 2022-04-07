import { Request, Response } from 'express';
import {container} from "tsyringe"
import { ICreateAvailabilityDTO } from '../../repositories/IAvailabilityRepository';

import { CreateAvailabilityService } from '../../services/CreateAvailabilityService';

class CreateAvailabilityController {
 
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      date, morning_start_time, morning_end_time, afternoon_start_time, afternoon_end_time, user_id 
    } = request.body;

    const createAvailabilityService = container.resolve(CreateAvailabilityService)
    
    const data: ICreateAvailabilityDTO = {
      date,
      morning_start_time,
      morning_end_time,
      afternoon_start_time,
      afternoon_end_time,
      user_id
    }

    await createAvailabilityService.execute(data);

    return response.status(201).send();
  }
}

export { CreateAvailabilityController };
