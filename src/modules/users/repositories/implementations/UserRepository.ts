import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { ICreateUserDTO, IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository{
   private respository: Repository<User>

   constructor() {
     this.respository = getRepository(User)
   }

   async deleteById(id: string): Promise<void> {

      await this.respository.delete(id)

   }

   async create({
     name, password, username
   }: ICreateUserDTO): Promise<void>{
      const user = this.respository.create({
         name,
         password,
         username
      })

      await this.respository.save(user)


   }
   
   async findByName(username: string): Promise<User | undefined> {
      const user = await this.respository.findOne({username})

      return user;
   }


   async findById(id: string): Promise<User | undefined> {
      const user = await this.respository.findOne(id)
      return user;
   }
   
   async findAll(): Promise<User[]> {
      const users = await this.respository.find()
      
      return users; 

   }

   public async save(data: User): Promise<void> {
      await this.respository.save(data);
    }

}

export {UserRepository}