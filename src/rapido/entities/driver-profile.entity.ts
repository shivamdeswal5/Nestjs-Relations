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
import { Vehicle } from './vehicle.entity';

@Entity('driver-profile')
export class DriverProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  liscenseNumber: string;

  @Column()
  aadhaarNumber: string;

  @OneToOne(()=>Vehicle, vehile=> vehile.driverProfile)
  vehicle: Vehicle

  @OneToOne(()=> User, user=> user.driverProfile)
  @JoinColumn()
  user:User
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}