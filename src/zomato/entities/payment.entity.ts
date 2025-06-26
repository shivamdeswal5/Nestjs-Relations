import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentMethod } from '../enums/PaymentMethod';
import { Order } from './order.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'decimal'})
  amount : number

  @Column({type: 'enum', enum:PaymentMethod})
  paymentMethod: PaymentMethod

  @OneToOne(() => Order, order => order.payment)
   @JoinColumn()
   order: Order;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
