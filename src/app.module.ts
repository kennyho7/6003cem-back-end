import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Pet } from './pets/entities/pet.entity';
import { UserFav } from './users/entities/user-fav-entity';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/google-strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'petDb',
      entities: [User, Pet, UserFav],
      synchronize: true,
    }),
    // JwtModule.register({
    //   secret: 'secret',
    //   signOptions: { expiresIn: '30d' },
    // }),
    UsersModule,
    PetsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
