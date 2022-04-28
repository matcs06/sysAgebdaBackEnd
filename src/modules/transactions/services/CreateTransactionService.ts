import {inject, injectable} from "tsyringe"
import { ITransactionsRepository, ICreateTransactionDTO } from '../repositories/ITransactionsRepository';

interface IRequest{
   title:string;
   value:string;
   formatedDate: string;
   user_id:string;
   payment_status:string;
}

@injectable()
class CreateTransactionService {

  constructor(
    @inject("TransactionsRepository")
    private TransactionRepository: ITransactionsRepository) {
  }

  async execute({
    title, formatedDate, value, payment_status, user_id
  }:IRequest):Promise<void> {
    
   const type = Number(value) >= 0 ? "income" : "outcome" 
    
    await this.TransactionRepository.create({
      title,
      value,
      formatedDate,
      type,
      payment_status,
      user_id
    });
  }
}

export { CreateTransactionService };