import { v4 as uuidv4 } from 'uuid';

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm"
import { User } from '../../users/entities/User';

@Entity("products")
class Product {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  duration: string;

  @Column()
  user_id: string;

  @Column()
  image_url: string;

  @Column()
  enabled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Product };
