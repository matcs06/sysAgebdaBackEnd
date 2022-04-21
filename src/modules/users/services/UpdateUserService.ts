import { IUserRepository } from '../repositories/IUserRepository'
import {inject, injectable} from "tsyringe"
import {AppError} from '../../../shared/errors/AppError';

interface IRequest{
   username: string;
   welcome_message:string;
   business_name:string;
   address: string;
   phone:string;
}

@injectable()
class UpdateUserService {

   constructor(
      @inject("UserRepository")
      private UserRepository: IUserRepository) {
   }

  async execute({
     username, address, business_name, welcome_message, phone
  }:IRequest):Promise<void> {
    try {
      const foundUser = await this.UserRepository.findByName(username)

      if(!foundUser){
        throw new AppError("User does not exists")
      }

      foundUser.phone = phone;
      foundUser.address = address;
      foundUser.business_name = business_name;
      foundUser.welcome_message = welcome_message;

      await this.UserRepository.save(foundUser)

    } catch (error) {
      throw new AppError("Error updating service")
      
    }
    
  }
}

export { UpdateUserService };
