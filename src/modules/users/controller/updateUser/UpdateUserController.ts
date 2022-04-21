import { Request, Response } from 'express';
import {container} from "tsyringe"

import { UpdateUserService } from '../../services/UpdateUserService';

class UpdateUserController {
 
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      username, phone, welcome_message, business_name, address
    } = request.body;

    const updateUserService = container.resolve(UpdateUserService)

    await updateUserService.execute({
     username, phone,welcome_message,business_name, address
    });

    return response.status(201).send();
  }
}

export { UpdateUserController };