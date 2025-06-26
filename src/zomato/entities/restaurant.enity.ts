import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

import { Dish } from './dish.entity';
import { Review } from './review.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  rating: string;

  @Column()
  isOpen: boolean;

  @OneToMany(() => Dish, (dish) => dish.restaurant)
  menu: Dish[];

  @OneToMany(() => Review, review => review.restaurant) 
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
