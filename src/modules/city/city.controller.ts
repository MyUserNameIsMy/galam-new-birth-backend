import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { ApiTags } from '@nestjs/swagger';
import { CityEntity } from './entities/city.entity';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('')
  async findAll(): Promise<CityEntity[]> {
    return await this.cityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cityService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cityService.remove(+id);
  }
}
