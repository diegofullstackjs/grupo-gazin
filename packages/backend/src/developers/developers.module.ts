import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperEntity } from './entities/developer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeveloperEntity])],
  controllers: [DevelopersController],
  providers: [DevelopersService],
  exports: [],
})
export class DevelopersModule {}
