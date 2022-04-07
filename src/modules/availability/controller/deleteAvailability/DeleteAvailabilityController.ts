import { Request, Response } from 'express';
import {container} from "tsyringe"

import { DeleteAvailabilityService } from '../../services/DeleteAvailabilityService';

class DeleteAvailabilityController {
 
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      id
    } = request.params;

    const deleteAvailabilityService = container.resolve(DeleteAvailabilityService)

    await deleteAvailabilityService.execute(id);

    return response
      .status(200)
      .json({ message: 'availability successfully deleted!!' });
    
  }
}

export { DeleteAvailabilityController };