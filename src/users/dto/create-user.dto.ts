import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Pet } from 'src/pets/entities/pet.entity';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  pets: Pet[];
  @ApiProperty()
  favoritePets: Pet[];
}
