import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthGuard } from 'src/auth/auth-guard';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  auth(@Body() authUserDto: AuthUserDto) {
    return this.usersService.login(authUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.id = +id;

    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('favorite')
  async addPetToFavorites(
    @Query('petId') petId: number,
    @Query('userId') userId: number,
  ) {
    console.log(petId, userId);
    await this.usersService.addPetToFavorites(petId, userId);
  }

  @UseGuards(AuthGuard)
  @Delete('favorite')
  async removePetFromFavorites(
    @Query('petId') petId: number,
    @Query('userId') userId: number,
  ) {
    await this.usersService.removePetFromFavorites(petId, userId);
  }
}
