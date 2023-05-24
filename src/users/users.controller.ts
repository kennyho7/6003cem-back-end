import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthGuard } from 'src/auth/auth-guard';
import { User } from './entities/user.entity';
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.id = +id;

    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  //   @Post(':userId/favorites/:petId')
  //   async addUserFavoritesPet(
  //     @Param('userId') userId: number,
  //     @Param('petId') petId: number,
  //   ): Promise<void> {
  //     await this.usersService.addUserFavoritesPet(userId, petId);
  //   }
  // }

  // @Post(':userId/favorites')
  // async addFavoritePet(
  //   @Param('userId') userId: number,
  //   @Body('petId') petId: number,
  // ): Promise<void> {
  //   await this.usersService.addFavoritePet(userId, petId);
  // }

  @Get(':userId/favorite')
  async getFavoritePets(@Param('userId') userId: number): Promise<UserFav[]> {
    const favoritePets = await this.usersService.getFavoritePets(userId);
    return favoritePets;
  }

  @Post('favorite')
  async createFavoritePet(@Body() userfav: any): Promise<void> {
    await this.usersService.createFavoritePet(userfav.userId, userfav.petId);
  }

  @Delete(':id/favorite')
  async deleteFavoritePet(@Param('id') id: number): Promise<boolean> {
    const deleted = await this.usersService.deleteFavoritePet(id);
    return deleted.affected > 0;
  }
}
// @Post('favorite')
// async addPetToFavorites(
//   @Query('petId') petId: number,
//   @Query('userId') userId: number,
// ) {
//   console.log(petId, userId);
//   await this.usersService.addPetToFavorites(petId, userId);
// }

// @UseGuards(AuthGuard)
// @Delete(':id/favorite')
// async removePetFromFavorites(
//   @Query('petId') petId: number,
//   @Query('userId') userId: number,
// ) {
//   await this.usersService.removePetFromFavorites(petId, userId);
