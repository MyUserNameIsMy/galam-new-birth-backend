import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiTags } from '@nestjs/swagger';
import { CountryEntity } from './entities/country.entity';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post('seed')
  async seed(): Promise<{ message: string }> {
    return await this.countryService.seed();
  }

  @Get()
  async findAll() {
    return await this.countryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CountryEntity> {
    return this.countryService.findOne(+id);
  }

  @Delete()
  async removeAll(): Promise<{ message: string }> {
    return await this.countryService.removeAll();
  }

  @Delete(':id')
  async removeOne(@Param('id') id: string): Promise<{ message: string }> {
    return await this.countryService.remove(+id);
  }
}
