import { Module } from '@nestjs/common';
import { RapidoService } from './rapido.service';
import { RapidoController } from './rapido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DriverProfile } from './entities/driver-profile.entity';
import { Payment } from './entities/payment.entity';
import { Ride } from './entities/ride.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Ratings } from './entities/rating.entity';
import { Location } from './entities/location.entity';
import { Notifications } from './entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,DriverProfile,Location,Notifications,Payment,Ride,Vehicle,Ratings])],
  providers: [RapidoService],
  controllers: [RapidoController]
})
export class RapidoModule {}
