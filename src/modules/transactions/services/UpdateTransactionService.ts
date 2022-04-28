import { ITransactionsRepository } from '../repositories/ITransactionsRepository'
import {inject, injectable} from "tsyringe"
import {AppError} from '../../../shared/errors/AppError';

interface IRequest{
   id: string, payment_status:string;
}

@injectable()
class UpdateTransactionService {

   constructor(
      @inject("TransactionsRepository")
      private TransactionRepository: ITransactionsRepository) {
   }

  async execute({
    id, payment_status
  }:IRequest):Promise<void> {
    try {
      const foundTransaction = await this.TransactionRepository.findById(id)

      if(!foundTransaction){
        throw new AppError("Transaction does not exists")
      }

      foundTransaction.payment_status = payment_status;

      await this.TransactionRepository.save(foundTransaction)

    } catch (error) {
      throw new AppError("Error updating transaction")
      
    }
    
  }
}

export { UpdateTransactionService };
