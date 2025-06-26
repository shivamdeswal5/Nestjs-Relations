import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../enums/UserRoles';
import { DriverProfile } from './driver-profile.entity';
import { Ride } from './ride.entity';
import { Ratings } from './rating.entity';
import { Notifications } from './notification.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({type:'enum', enum:UserRole})
  role: UserRole

  @OneToOne(()=> DriverProfile, driverProfile => driverProfile.user)
  driverProfile?: DriverProfile

  @OneToMany(()=> Ride, ride=> ride.rider)
  rideAsRider: Ride[]

  @OneToMany(()=> Ride, ride=> ride.driver)
  rideAsDriver: Ride[]

  @OneToMany(()=> Ratings, ratings=> ratings.rater)
  ratingsGiven: Ratings[];

  @OneToMany(()=> Notifications, notification=>notification.user)
  notifications: Notifications[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

}