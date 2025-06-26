import { Module } from '@nestjs/common';
import { ZomatoService } from './zomato.service';
import { ZomatoController } from './zomato.controller';

@Module({
  providers: [ZomatoService],
  controllers: [ZomatoController]
})
export class ZomatoModule {}
