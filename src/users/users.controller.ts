import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserFavDto } from './dto/create-userFav.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthGuard } from 'src/auth/auth-guard';
import { RolesGuard } from '../auth/roles-guard';
import { Role } from '../auth/role.enum';
import { Roles } from '../auth/roles-decorator';
import { UserFav } from './entities/user-fav-entity';

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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.id = +id;

    return this.usersService.update(updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  @Get(':userId/favorite')
  async getFavoritePets(@Param('userId') userId: number): Promise<UserFav[]> {
    const favoritePets = await this.usersService.getFavoritePets(userId);
    return favoritePets;
  }

  @Post('favorite')
  async createFavoritePet(@Body() createUserFavDto: CreateUserFavDto): Promise<UserFav> {
    return await this.usersService.createFavoritePet(createUserFavDto);
  }

  @Delete(':id/favorite')
  async deleteFavoritePet(@Param('id') id: number): Promise<boolean> {
    const deleted = await this.usersService.deleteFavoritePet(id);
    return deleted.affected > 0;
  }
}
