import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeveloperEntity } from './entities/developer.entity';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Repository } from 'typeorm';
import { PaginationDTO } from './dto/pagination-developer.dto';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(DeveloperEntity)
    private readonly developerRepository: Repository<DeveloperEntity>,
  ) {}
  async create(
    createDeveloperDto: CreateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.developerRepository.save(createDeveloperDto);
  }

  async findAll(paginationDto: PaginationDTO): Promise<PaginationDTO> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.developerRepository.count();
    const developers = await this.developerRepository
      .createQueryBuilder()
      .orderBy('id', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();
    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: developers,
    };
  }

  async findOne(id: number): Promise<DeveloperEntity> {
    return await this.developerRepository.findOne(id);
  }

  async update(
    id: number,
    updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.update(id, updateDeveloperDto);
  }

  remove(id: number): Promise<boolean> {
    return this.remove(id);
  }
}
