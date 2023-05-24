import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @Column()
  location: string;

  // @ManyToMany(() => User, (user) => user.favorites)
  // users: User[];

  // @OneToMany(() => UserFav, (userFav) => userFav.pet)
  // userFavorites: UserFav[];
}
