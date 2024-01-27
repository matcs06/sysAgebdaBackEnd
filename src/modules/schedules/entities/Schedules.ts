import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid"
import { User } from "../../users/entities/User";

@Entity("schedules")
class Schedules {
  @PrimaryColumn()
  id: string;

  @Column()
  customer_name: string;

  @Column()
  phone_number: string;

  @Column()
  service: string;

  @Column()
  date: string;

  @Column()
  start_time: string;

  @Column()
  service_duration: string;

  @Column()
  payment_status: string;

  @Column()
  isMorning: boolean;

  @Column()
  price: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.schedules)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

}

export { Schedules }