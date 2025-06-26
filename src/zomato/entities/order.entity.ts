import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/OrderStatus';
import { Address } from './address.entity';
import { User } from './user.entity';
import { OrderItem } from './order-item';
import { Payment } from './payment.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders) 
  customer: User;

  @ManyToOne(() => User, (user) => user.deliveries) 
  deliveryPartner: User;

  @ManyToOne(() => Address) 
  deliveryAddress: Address;

  @OneToOne(() => Payment, payment => payment.order) payment: Payment;

  @Column({ type: 'enum', enum: OrderStatus }) 
  status: OrderStatus;

  @OneToMany(() => OrderItem, (item) => item.order) 
  items: OrderItem[];
  
  @Column('decimal') 
  totalAmount: number;

  @CreateDateColumn() 
  placedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
