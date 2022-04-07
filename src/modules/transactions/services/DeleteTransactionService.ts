import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { ICreateTransactionDTO, ITransactionsRepository } from '../repositories/ITransactionsRepository';

interface IRequest{
   name:string;
   description:string;
   price: string;
   duration:string;
}

@injectable()
class DeleteTransactionsService {

  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository) {
  }

  async execute(id:string): Promise<void> {

     const findTransactions = await this.transactionsRepository.findById(id)

     if(!findTransactions){
        throw new AppError("Transaction not found")
     }

     await this.transactionsRepository.deleteById(id);
  }
}

export { DeleteTransactionsService };
