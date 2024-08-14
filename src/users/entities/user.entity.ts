import { UUID } from 'crypto';
import { Role } from './role.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
  ;
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rut: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  country: string;

  @Column({type: 'bigint'})
  phone: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @CreateDateColumn()
  createdDate?: Date;

  @UpdateDateColumn()
  lastUpdatedDate?: Date;

  @DeleteDateColumn()
  deletedDate?: Date;
}
