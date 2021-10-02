import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { request } from 'http';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { DeveloperEntity } from './entities/developer.entity';

describe('DevelopersController', () => {
  let controller: DevelopersController;
  const body: CreateDeveloperDto = {
    age: 20,
    hobby: ['Web developer', 'Music'],
    name: 'Wellington',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopersController],
      providers: [
        DevelopersService,
        {
          provide: getRepositoryToken(DeveloperEntity),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            create: jest.fn().mockResolvedValue(body),
            save: jest.fn().mockResolvedValue(body),
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
      expect(result).toEqual(body);
    });
    it('should return create failed', async () => {
      jest.spyOn(controller, 'create').mockRejectedValueOnce(new Error());
      expect(controller.create(body)).rejects.toThrowError();
    });
  });
});
