import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bookings, { eager: true })
  user: User;

  @ManyToOne(() => Vehicle, vehicle => vehicle.bookings, { eager: true })
  vehicle: Vehicle;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;
}
