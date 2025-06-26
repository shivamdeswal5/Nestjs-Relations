import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Location } from './location.entity';
import { RideStauts } from '../enums/RideStatus';
import { Payment } from './payment.entity';
import { Ratings } from './rating.entity';

@Entity('rides')
export class Ride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.rideAsRider)
  rider: User;

  @ManyToOne(() => User, (user) => user.rideAsDriver)
  driver: User;

  @Column({type:"enum", enum:RideStauts})
  rideStatus: RideStauts;

  @ManyToOne(() => Location)
  pickupLocation: Location;

  @ManyToOne(() => Location)
  dropLocation: Location;

  @OneToOne(()=>Payment, payment => payment.ride)
  payment : Payment;

  @OneToMany(()=> Ratings, ratings=> ratings.ride)
  ratings: Ride;

  @Column('timestamp', { nullable: true })
  startTime?: Date;

  @Column('timestamp', { nullable: true })
  endTime?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
