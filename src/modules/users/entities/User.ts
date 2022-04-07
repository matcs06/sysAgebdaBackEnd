import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from "uuid"
import { Availability } from "../../availability/entities/Availability";
import { Product } from "../../product/entities/Product";
import { Schedules } from "../../schedules/entities/Schedules";
import { Transactions } from "../../transactions/entities/Transactions";

@Entity("users")
class User{
   @PrimaryColumn()
   id:string;

   @Column()
   name:string;

   @Column()
   username:string;

   @Column()
   password: string;

   @CreateDateColumn()
   created_at: Date;
    
   @OneToMany(() => Availability, availability => availability.user,{
    cascade: true
  })
   availabilities: Availability[];

   @OneToMany(() => Schedules, schedule => schedule.user,{
    cascade: true
  })
   schedules: Schedules[];

   @OneToMany(() => Product, product => product.user,{
    cascade: true
  })
   products: Product[];

   @OneToMany(()=> Transactions, transaction => transaction.user,{
     cascade: true
   })
   transactions: Transactions[]

   constructor() {
     if (!this.id) {
      this.id = uuidv4();
     }
   }

}

export {User}