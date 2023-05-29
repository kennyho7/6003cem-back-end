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
  Res,
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
import { AuthGuard } from '../auth/auth-guard';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Roles } from '../auth/roles-decorator';
import { RolesGuard } from '../auth/roles-guard';
import { Role } from '../auth/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload-image',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )

  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    const imagePath = `./pets/upload-image/${image.filename}`;
    return { imagePath };
  }

  @Get('upload-image/:imagePath')
  async getImage(@Param('imagePath') imagePath: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'upload-image', imagePath);
    return res.sendFile(filePath);
  }
}


