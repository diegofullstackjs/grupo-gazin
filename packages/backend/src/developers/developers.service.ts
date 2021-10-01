import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeveloperEntity } from './entities/developer.entity';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { PaginationDTO } from './dto/pagination-developer.dto';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(DeveloperEntity)
    private readonly developerRepository: Repository<DeveloperEntity>,
  ) {}
  create(createDeveloperDto: CreateDeveloperDto): Observable<DeveloperEntity> {
    return this.developerRepository.create(createDeveloperDto);
  }

  findAll(paginationDto: PaginationDTO): Observable<PaginationDTO> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.developerRepository.count();
    const developers = await this.developerRepository
      .createQueryBuilder()
      .orderBy('createdAt', 'DESC')
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

  findOne(id: number): Observable<DeveloperEntity> {
    return this.developerRepository.findOne(id);
  }

  update(
    id: number,
    updateDeveloperDto: UpdateDeveloperDto,
  ): Observable<DeveloperEntity> {
    return this.update(id, updateDeveloperDto);
  }

  remove(id: number): Observable<boolean> {
    return this.remove(id);
  }
}
