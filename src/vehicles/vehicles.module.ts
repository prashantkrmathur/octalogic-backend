import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../entities/booking.entity';
import { User } from '../entities/user.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleCategory } from '../entities/vehicle_category.entity';
import { VehicleController } from './vehicles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, VehicleCategory, Booking, User])],
  controllers: [VehicleController],
})
export class VehicleModule {}