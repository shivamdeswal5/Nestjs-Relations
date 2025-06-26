import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Ride } from './ride.entity';
import { User } from './user.entity';

@Entity('ratings')
export class Ratings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stars: string;

  @Column()
  note: string;

  @ManyToOne(()=>Ride, ride=> ride.ratings)
  ride: Ride;

  @ManyToOne(()=> User, user=> user.ratingsGiven)
  rater:User

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
