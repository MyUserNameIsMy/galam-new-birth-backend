import { BadRequestException, Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  async findOne(id: number): Promise<CityEntity> {
    return await CityEntity.findOne({ where: { id } });
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const city = await CityEntity.findOne({ where: { id } });
      await city.remove();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return {
      message: 'Successfully deleted',
    };
  }
}
