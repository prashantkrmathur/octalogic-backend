import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class VehicleCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column()
  wheelCount: number; 

  @OneToMany(() => Vehicle, vehicle => vehicle.category)
  vehicles: Vehicle[];
}
