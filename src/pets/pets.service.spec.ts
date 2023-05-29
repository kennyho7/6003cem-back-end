import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from './pets.service';
import { AppModule } from '../app.module';
import * as fs from 'fs';
describe('PetsService', () => {
  let service: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<PetsService>(PetsService);
  });

  it('create pet', async () => {
    const pet = await service.create({
      breed: 'Test',
      age: 20,
      name: 'kenny',
      location: 'kt',
      image: 'path',
    });

    expect(pet).toEqual(
      expect.objectContaining({
        breed: 'Test',
        age: 20,
        name: 'kenny',
        location: 'kt',
        image: 'path',
      }),
    );
  });

  // it('update pet', async () => {
  //   const pet = await service.create({
  //     variety: 'Test2',
  //     gender: 'Male',
  //     age: 2,
  //     imageFileName: 'test2.jpeg',
  //   });

  //   const updatePet = await service.update(pet.id, {
  //     variety: 'Test2',
  //     gender: 'Male',
  //     age: 2,
  //     live: true,
  //   });

  //   expect(updatePet).toEqual(
  //     expect.objectContaining({
  //       variety: 'Test2',
  //       gender: 'Male',
  //       age: 2,
  //     }),
  //   );
  // });

});
