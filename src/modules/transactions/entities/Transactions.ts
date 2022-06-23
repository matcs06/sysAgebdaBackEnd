import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from "uuid"
import { User } from "../../users/entities/User";

@Entity("transaction")
class Transactions{
   @PrimaryColumn()
   id:string;

   @Column()
   title:string;

   @Column()
   value:string;

   @Column()
   type: string;

   @Column()
   formatedDate: string;

   @Column()
   payment_status: string;

   @Column()
   customer_phone: string;

   @CreateDateColumn()
   created_at: Date;

   @Column()
   user_id: string;

   @ManyToOne(() => User, user => user.transactions)
   @JoinColumn({name: 'user_id'})
   user: User

   constructor() {
     if (!this.id) {
      this.id = uuidv4();
     }
   }

}

export {Transactions}