import { Request, Response } from 'express';
import { container } from "tsyringe";
import { AuthenticateUserService } from "../../services/AuthenticateUserService";

class AuthenticateGoogleUserController {
   async handle(request: Request, response: Response): Promise<Response>{
 
     const { google_id_token} = request.body
      
     const authenticateUserService = container.resolve(AuthenticateUserService);
      
     const token = await authenticateUserService.executeGoogle(google_id_token);

     return response.json(token)
   }
}
export {AuthenticateGoogleUserController}