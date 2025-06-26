import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentMethod } from '../enums/PaymentMethod';
import { Ride } from './ride.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'decimal'})
  amount : number

  @Column({type: 'enum', enum:PaymentMethod})
  paymentMethod: PaymentMethod

  @OneToOne(() => Ride, ride => ride.payment) 
  @JoinColumn() 
  ride: Ride;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
