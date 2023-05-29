import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { secret } from '../auth/secret';
import { Pet } from '../pets/entities/pet.entity';
import { UserFav } from './entities/user-fav-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Pet, UserFav]),
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
