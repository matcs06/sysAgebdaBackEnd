import {inject, injectable} from "tsyringe"
import { IUserRepository } from '../repositories/IUserRepository';
import { hash } from "bcrypt"
import verifyKey from "../../../utils/UserSecurity"

interface IRequest{
   name:string;
   username:string;
   password: string;
}

@injectable()
class CreateUserService {

  constructor(
    @inject("UserRepository")
    private UserRepository: IUserRepository) {
  }

  async execute({
    name,password,username
  }:IRequest):Promise<void> {
    const userAlreadyExists = await this.UserRepository.findByName(username)

    if(userAlreadyExists){
      throw new Error("User already exists")
    }
  
    const passwordHash = await hash(password, 8)

    await this.UserRepository.create({
      name, password:passwordHash, username
    });
  }
}

export { CreateUserService };