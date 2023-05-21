import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserFav {
  @PrimaryColumn()
  userid: number;

  @PrimaryColumn()
  petid: number;
}
