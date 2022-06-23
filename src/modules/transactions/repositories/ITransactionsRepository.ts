import { Transactions } from '../entities/Transactions';

interface ICreateTransactionDTO{
   title:string;
   value:string;
   formatedDate: string;
   type: string;
   payment_status:string;
   user_id:string;
   customer_phone: string;
}

interface ITransactionsRepository{
   create({
      title, formatedDate, value, payment_status, user_id, customer_phone
   }: ICreateTransactionDTO): Promise<void>;

   deleteById(id:string): Promise<void>;
   findById(username:string): Promise<Transactions | undefined>;
   list(user_id:string):Promise<Transactions[]>;
   save(data: Transactions):Promise<void>;
}

export { ITransactionsRepository, ICreateTransactionDTO };