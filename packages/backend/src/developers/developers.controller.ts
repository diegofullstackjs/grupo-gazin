import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { PaginationDTO } from './dto/pagination-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Observable } from 'rxjs';
@Controller('api/v1/developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developersService.create(createDeveloperDto);
  }

  @Get()
  findAll(@Query() Paginationdto: PaginationDTO): Promise<PaginationDTO> {
    Paginationdto.page = Number(Paginationdto.page);
    Paginationdto.limit = Number(Paginationdto.limit);
    return this.developersService.findAll({
      ...Paginationdto,
      limit: Paginationdto.limit > 10 ? 10 : Paginationdto.limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.developersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    return this.developersService.update(+id, updateDeveloperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.developersService.remove(+id);
  }
}
