import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {
  ApiBearerAuth,
  ApiQuery,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger/dist';
import { Pet } from './entities/pet.entity';
import { AuthGuard } from 'src/auth/auth-guard';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Roles } from 'src/auth/roles-decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { Role } from 'src/auth/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiOkResponse({ type: [Pet] })
  @ApiOperation({ summary: 'Get pets' })
  @ApiQuery({ name: 'breed', required: false })
  @ApiQuery({ name: 'location', required: false })
  @ApiQuery({ name: 'minAge', required: false })
  @ApiQuery({ name: 'maxAge', required: false })
  @Get()
  async get(
    @Query('breed') breed: string,
    @Query('location') location: string,
    @Query('minAge') minAge: number,
    @Query('maxAge') maxAge: number,
  ): Promise<Pet[]> {
    const where: any = {};

    if (breed) {
      where.breed = breed;
    }

    if (location) {
      where.location = location;
    }

    if (minAge) {
      where.age = MoreThanOrEqual(minAge);
    }

    if (maxAge) {
      where.age = LessThanOrEqual(maxAge);
    }

    const pets = await this.petsService.getPets(where);

    return pets;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    updatePetDto.id = +id;

    return this.petsService.update(updatePetDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
