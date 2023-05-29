import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: Repository<Pet>,
  ) {}

  async getPets(where: any): Promise<Pet[]> {
    const pets = await this.petsRepository.find({
      where: Object.keys(where).length !== 0 ? where : {},
    });

    return pets;
  }

  async create(createPetDto: CreatePetDto) {
    const pet: Pet = {
      id: null,
      name: createPetDto.name,
      age: createPetDto.age,
      breed: createPetDto.breed,
      location: createPetDto.location,
      image: createPetDto.image ? createPetDto.image : '',
    };

    return await this.petsRepository.save(pet);
  }

  async update(updatePetDto: UpdatePetDto) {
    const pet: Pet = {
      id: updatePetDto.id,
      name: updatePetDto.name,
      age: updatePetDto.age,
      breed: updatePetDto.breed,
      location: updatePetDto.location,
      image: updatePetDto.image ? updatePetDto.image : '',
    };

    return await this.petsRepository.save(pet);
  }

  async remove(id: number) {
    return await this.petsRepository.delete(+id);
  }
}
