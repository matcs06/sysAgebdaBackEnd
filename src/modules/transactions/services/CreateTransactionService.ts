import {inject, injectable} from "tsyringe"
import { ITransactionsRepository, ICreateTransactionDTO } from '../repositories/ITransactionsRepository';

interface IRequest{
   title:string;
   value:string;
   formatedDate: string;
   user_id:string;
   payment_status:string;
   customer_phone:string;
}

@injectable()
class CreateTransactionService {

  constructor(
    @inject("TransactionsRepository")
    private TransactionRepository: ITransactionsRepository) {
  }

  async execute({
    title, formatedDate, value, payment_status, user_id, customer_phone
  }:IRequest):Promise<void> {
    
   const type = Number(value) >= 0 ? "income" : "outcome" 
   
   if(customer_phone == ""){
      customer_phone = "(00) 00000-0000"
   }
   
   await this.TransactionRepository.create({
      title,
      value,
      formatedDate,
      type,
      payment_status,
      user_id,
      customer_phone
   });


  }
}

export { CreateTransactionService };