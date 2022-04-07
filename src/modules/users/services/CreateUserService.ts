import {inject, injectable} from "tsyringe"
import { IUserRepository } from '../repositories/IUserRepository';
import { hash } from "bcrypt"
import verifyKey from "../../../utils/UserSecurity"

interface IRequest{
   name:string;
   username:string;
   password: string;
   key:string;
}

@injectable()
class CreateUserService {

  constructor(
    @inject("UserRepository")
    private UserRepository: IUserRepository) {
  }

  async execute({
    name,password,username, key
  }:IRequest):Promise<void> {
    const userAlreadyExists = await this.UserRepository.findByName(username)

    if(userAlreadyExists){
      throw new Error("User already exists")
    }

    verifyKey(key)
  
    const passwordHash = await hash(password, 8)

    await this.UserRepository.create({
      name, password:passwordHash, username
    });
  }
}

export { CreateUserService };