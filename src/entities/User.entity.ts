import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'users'}) 
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column({unique:true})
    email : string;

    @Column({type:'bigint'})
    mobile: number;

    @Column()
    password: string;

    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
}