import { ApiProperty } from '@nestjs/swagger/dist/decorators';

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
  image: string;
}
