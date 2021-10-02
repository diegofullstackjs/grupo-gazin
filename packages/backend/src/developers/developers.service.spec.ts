import { Test, TestingModule } from '@nestjs/testing';
import { FindManyOptions } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DevelopersService } from './developers.service';
import { DeveloperEntity } from './entities/developer.entity';
import { findAllDev } from './ultils/developers.mock';
describe('DevelopersService', () => {
  let service: DevelopersService;
  const createMocked = {
    name: 'kelvin diego da silva soares',
    age: 30,
    hobby: ['musica', 'internet'],
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevelopersService,
        {
          provide: getRepositoryToken(DeveloperEntity),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue({
              offset: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue(findAllDev['data']),
              clone: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              select: jest.fn().mockReturnThis(),
            }),
            findAndCount: jest.fn().mockResolvedValue(findAllDev),
            findAll: jest.fn().mockResolvedValue({
              data: findAllDev['data'],
              total: findAllDev['total'],
            }),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            create: jest.fn().mockResolvedValue({
              name: 'kelvin diego da silva soares',
              age: 30,
              hobby: ['musica', 'internet'],
            }),
            save: jest.fn().mockResolvedValue({
              name: 'kelvin diego da silva soares',
              age: 30,
              hobby: ['musica', 'internet'],
            }),
          },
        },
      ],
    }).compile();

    service = module.get<DevelopersService>(DevelopersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create a developer', () => {
    it('should be create', async () => {
      const dev = await service.create(createMocked);
      expect(dev).toEqual(createMocked);
    });
  });
  describe('find all developers and pagination', () => {
    it('should be list all developers and total', async () => {
      const findAll = jest.spyOn(service, 'findAll');
      const response = await service.findAll({ page: 1, limit: 10 }, '');
      expect(findAll).toBeCalledTimes(1);
      expect(response).toEqual(findAllDev);
    });
  });
});
