import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../entities/booking.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleCategory } from '../entities/vehicle_category.entity';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { CreateBookingDto } from './dto/create-vehicle-booking.dto';
import { User } from 'src/entities/user.entity';


@Controller('vehicles')
export class VehicleController {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,

    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,

    @InjectRepository(VehicleCategory)
    private readonly categoryRepo: Repository<VehicleCategory>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  @Get()
  async getByWheelCount(@Query('wheelCount') wheelCount: string) {
    const count = parseInt(wheelCount, 10);
    if (![2, 4].includes(count)) {
      throw new BadRequestException('Invalid wheelCount');
    }

    return await this.vehicleRepo.find({
      where: { category: { wheelCount: count } },
      relations: ['category'],
    });
  }

  @Get('/categories')
  async getCategories(@Query('wheelCount') wheelCount: string) {
    const count = parseInt(wheelCount, 10);
    if (![2, 4].includes(count)) {
      throw new BadRequestException('Invalid wheelCount');
    }

    return await this.categoryRepo.find({ where: { wheelCount: count } });
  }

  @Get('/models')
  async getModels(@Query('categoryId') categoryId: string) {
    return await this.vehicleRepo.find({
      where: { category: { id: parseInt(categoryId) } },
      relations: ['category'],
    });
  }

  @Post('booking')
  async bookVehicle(@Body() body: CreateBookingDto) {
    const { firstName, lastName, vehicleId, startDate, endDate } = body;

    const vehicle = await this.vehicleRepo.findOne({ where: { id: vehicleId } });
    if (!vehicle) throw new BadRequestException('Vehicle not found');

    const overlap = await this.bookingRepo.findOne({
      where: {
        vehicle: { id: vehicleId },
        startDate: LessThanOrEqual(endDate),
        endDate: MoreThanOrEqual(startDate),
      },
    });

    if (overlap) throw new BadRequestException('Booking dates conflict');

    let user = await this.userRepo.findOne({ where: { firstName, lastName } });
    if (!user) {
      user = this.userRepo.create({ firstName, lastName });
      await this.userRepo.save(user);
    }

    const booking = new Booking();
    booking.user = user;
    booking.vehicle = vehicle;
    booking.startDate = new Date(startDate).toISOString().slice(0, 10);
    booking.endDate = new Date(endDate).toISOString().slice(0, 10);

    await this.bookingRepo.save(booking);
    return { message: 'Booking successful', bookingId: booking.id };
  }
}
