import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';
import { DeveloperEntity } from './entities/developer.entity';
import { findAllDev, body } from './ultils/developers.mock';
describe('DevelopersController', () => {
  let controller: DevelopersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopersController],
      providers: [
        DevelopersService,
        {
          provide: getRepositoryToken(DeveloperEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(findAllDev.data[0]),
            update: jest.fn(),
            remove: jest.fn(),
            create: jest.fn().mockResolvedValue(body),
            save: jest.fn().mockResolvedValue(body),
            findAndCount: jest.fn().mockResolvedValue(findAllDev),
          },
        },
      ],
    }).compile();
    const app = module.createNestApplication();
    app.get;
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    controller = module.get<DevelopersController>(DevelopersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('Create a developer', () => {
    it('should return create successfully', async () => {
      const result = await controller.create(body);
      //assert
      expect(result).toEqual(body);
    });
    it('should return create failed', async () => {
      jest.spyOn(controller, 'create').mockRejectedValueOnce(new Error());
      expect(controller.create(body)).rejects.toThrowError();
    });
  });
});
