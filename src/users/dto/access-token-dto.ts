import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class AccessTokenDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  data: any;
}
