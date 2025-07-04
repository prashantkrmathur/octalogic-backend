import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { VehicleCategory } from './vehicle_category.entity';
import { Booking } from './booking.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelName: string; 

  @ManyToOne(() => VehicleCategory, category => category.vehicles, { eager: true })
  category: VehicleCategory;

  @OneToMany(() => Booking, booking => booking.vehicle)
  bookings: Booking[];
}
