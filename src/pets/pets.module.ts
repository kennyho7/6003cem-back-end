import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { Pet } from './entities/pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    MulterModule.register({ dest: 'upload-image' }),
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
