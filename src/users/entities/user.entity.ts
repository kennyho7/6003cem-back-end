import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/auth/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
