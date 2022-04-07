import { inject, injectable } from 'tsyringe';
import { ITransactionsRepository, ICreateTransactionDTO } from '../repositories/ITransactionsRepository';

@injectable()
class ListTransactionsService {

  constructor(
    @inject("TransactionsRepository")
    private TransactionRepository: ITransactionsRepository) {
  }

  async execute(user_id:string): Promise<ICreateTransactionDTO[]> {
    return await this.TransactionRepository.list(user_id);
  }
}

export { ListTransactionsService };