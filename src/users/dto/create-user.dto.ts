import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Role } from 'src/auth/role.enum';

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
}
