import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity';
import { DriverProfile } from './driver-profile.entity';

@Entity('vehicle')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  model: string;

  @Column()
  registrationNumber: string;

  @OneToOne(()=>DriverProfile, profile=>profile.vehicle)
  @JoinColumn() 
  driverProfile: DriverProfile;

  @OneToOne(()=> User, user=> user.driverProfile)
  @JoinColumn()
  user:User

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}