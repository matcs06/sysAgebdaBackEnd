import {inject, injectable} from "tsyringe"
import { ITransactionsRepository, ICreateTransactionDTO } from '../repositories/ITransactionsRepository';

interface IRequest{
   title:string;
   value:string;
   formatedDate: string;
   user_id:string;
}

@injectable()
class CreateTransactionService {

  constructor(
    @inject("TransactionsRepository")
    private TransactionRepository: ITransactionsRepository) {
  }

  async execute({
    title, formatedDate, value, user_id
  }:IRequest):Promise<void> {
    
   const type = Number(value) >= 0 ? "income" : "outcome" 
    
    await this.TransactionRepository.create({
      title,
      value,
      formatedDate,
      type,
      user_id
    });
  }
}

export { CreateTransactionService };