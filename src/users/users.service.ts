import { AuthUserDto } from './dto/auth-user.dto';
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserFavDto } from './dto/create-userFav.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/access-token-dto';
import { Pet } from '../pets/entities/pet.entity';
import { UserFav } from './entities/user-fav-entity';

const saltRounds = 10;
@Injectable()
export class UsersService {
  constructor(
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

  

  async getFavoritePets(userId: number): Promise<UserFav[]> {
    console.log(userId);
    const userFavs = await this.userfavRepository.find({
      where: { userId: userId },
    });

    return userFavs;
  }

  async createFavoritePet(createUserFavDto: CreateUserFavDto): Promise<UserFav> {
    const fav: UserFav = {
      id: null,
      userId: createUserFavDto.userId,
      petId: createUserFavDto.petId,
    };
    console.log(fav);

    return await this.userfavRepository.save(fav);
  }

  async deleteFavoritePet(petId: number) {
    return await this.userfavRepository.delete({ petId });
  }
}


