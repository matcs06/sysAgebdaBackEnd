import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailabilityService } from '../../services/ListAvailabilitiesService';

class ListAvailabilityController {

  async handle(request: Request, response: Response): Promise<Response> {
    
    const {user_id} = request.query
    console.log(user_id)
    const listAvailabilityervice = container.resolve(ListAvailabilityService)

    const all = await listAvailabilityervice.execute(String(user_id));

    return response.json(all);
  }
}

export { ListAvailabilityController };
