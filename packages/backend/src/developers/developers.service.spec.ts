import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DevelopersService } from './developers.service';
import { DeveloperEntity } from './entities/developer.entity';

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
            findAll: jest.fn(),
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
});
