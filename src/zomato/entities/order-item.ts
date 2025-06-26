import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Dish } from './dish.entity';
import { Order } from './order.entity';

@Entity('order-items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items) 
  order: Order;

  @ManyToOne(() => Dish, (dish) => dish.orderItems) 
  dish: Dish;

  @Column() quantity: number;

  @Column('decimal') price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
