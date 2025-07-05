import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { User } from 'src/entities/user.entity';
import { Vehicle } from 'src/entities/vehicle.entity';
import { VehicleCategory } from 'src/entities/vehicle_category.entity';
import { VehicleController } from './vehicles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, VehicleCategory, Booking, User])],
  controllers: [VehicleController],
})
export class VehicleModule {}