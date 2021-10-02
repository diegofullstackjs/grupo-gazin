import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeveloperEntity } from './entities/developer.entity';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Like, Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
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

  async findAll(
    options: IPaginationOptions,
    dev: string,
  ): Promise<Pagination<DeveloperEntity>> {
    const queryBuilder = await this.developerRepository
      .createQueryBuilder('developers')
      .orderBy({ name: 'DESC' })
      .where({ name: Like(`%${dev}%`) });
    return paginate<DeveloperEntity>(queryBuilder, options);
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

  async remove(id: string): Promise<any> {
    return await this.developerRepository.delete({ id });
  }
}
