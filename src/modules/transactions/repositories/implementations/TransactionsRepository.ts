import { getRepository, Repository } from "typeorm";
import { Transactions } from "../../entities/Transactions";
import { ICreateTransactionDTO, ITransactionsRepository } from "../ITransactionsRepository";

class TransactionsRepository implements ITransactionsRepository{

   private repository: Repository<Transactions>

   constructor(){
      this.repository = getRepository(Transactions)
   }

   async deleteById(id: string): Promise<void> {
      await this.repository.delete(id)
   }

   async findById(id: string): Promise<Transactions | undefined> {
      const transaction = await this.repository.findOne(id);

      return transaction;
   }

   async list(user_id:string): Promise<Transactions[]> {
      const transactions = await this.repository.find({user_id:user_id})
      
      return transactions; 

   }

   async create(data: ICreateTransactionDTO): Promise<void> {
      const transactions = this.repository.create(data)
      await this.repository.save(transactions)

   }

}

export {TransactionsRepository};