import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { User } from 'src/users/entities/user.entity';

export class CreatePetDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  breed: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  user: User[];
}
