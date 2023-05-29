import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateUserFavDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  petId: number;
}
