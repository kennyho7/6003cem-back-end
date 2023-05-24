import { AuthUserDto } from './dto/auth-user.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/access-token-dto';
import { Pet } from '../pets/entities/pet.entity';
// import { Pet } from 'src/pets/entities/pet.entity';
import { UserFav } from './entities/user-fav-entity';

const saltRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserFav)
    private userfavRepository: Repository<UserFav>,
    private jwtService: JwtService,
  ) {}
  async login(authUserDto: AuthUserDto): Promise<AccessTokenDto> {
    const user = await this.usersRepository.findOne({
      where: {
        username: authUserDto.username,
      },
    });

    if (user == null) {
      throw new BadRequestException('user not exist');
    }
    const verified = await bcrypt.compare(authUserDto.password, user.password);

    if (!verified) {
      throw new BadRequestException('password wrong');
    }

    const payload = {
      username: user.username,
      userId: user.id,
      roles: [user.role],
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      data: payload,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const user: User = {
      id: null,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      username: createUserDto.username,
      password: hashedPassword,
      role: createUserDto.role,
    };

    return await this.usersRepository.save(user);
  }

  async update(updateUserDto: UpdateUserDto) {
    const user: User = {
      id: updateUserDto.id,
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      username: updateUserDto.username,
      password: updateUserDto.password,
      role: updateUserDto.role,
    };

    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(+id);
  }

  // async addUserFavoritesPet(userId: number, petId: number) {
  //   // Get the user and pet entities.
  //   const user = await this.usersRepository.findOne({
  //     where: { id: userId },
  //   });
  //   const pet = await this.petsRepository.findOne({
  //     where: { id: petId },
  //   });

  //   // Add the pet to the user's favorites.
  //   user.favorites.push(pet);
  //   pet.users.push(user);

  //   // Save the changes to the database.
  //   await this.usersRepository.save(user);
  //   await this.petsRepository.save(pet);
  // }

  // async getFavoritePets(userId: number): Promise<number[]> {
  //   const user = await this.usersRepository
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.favoritePets', 'favoritePets')
  //     .where('user.id = :userId', { userId })
  //     .getOne();

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user.favoritePets.map((favoritePets) => favoritePets.id);
  // }

  // async addFavoritePet(userId: number, petId: any): Promise<void> {
  //   const user = await this.usersRepository
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.favoritePets', 'favoritePets')
  //     .where('user.id = :userId', { userId })
  //     .getOne();

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   user.favoritePets.push(petId);
  //   await this.usersRepository.save(user);
  // }

  async getFavoritePets(userId: number): Promise<UserFav[]> {
    console.log(userId);
    const userFavs = await this.userfavRepository.find({
      where: { userId: userId },
    });

    return userFavs;
  }

  async createFavoritePet(userId: number, petId: number) {
    const fav: UserFav = {
      id: null,
      userId: userId,
      petId: petId,
    };
    console.log(fav);

    return await this.userfavRepository.save(fav);
  }

  async deleteFavoritePet(id: number) {
    return await this.userfavRepository.delete(id);
  }
}
