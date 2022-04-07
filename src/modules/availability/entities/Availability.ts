import { v4 as uuidv4 } from 'uuid';

import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, } from "typeorm"
import { User } from '../../users/entities/User';

@Entity("availability")
class Availability {
  @PrimaryColumn()
  id?: string;
  
  @Column()
  date: string;
  
  @Column()
  morning_start_time: string;
  
  @Column()
  morning_end_time: string;
  
  @Column()
  afternoon_start_time: string;

  @Column()
  afternoon_end_time: string;

  @Column()
  user_id: string;

  @ManyToOne(()=> User , user => user.availabilities)
  @JoinColumn({name: 'user_id'})
  user:User;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Availability };
