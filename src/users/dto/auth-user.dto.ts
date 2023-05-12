import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class AuthUserDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}
