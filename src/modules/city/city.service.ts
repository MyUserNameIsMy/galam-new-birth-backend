import { BadRequestException, Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  async findAll(): Promise<CityEntity[]> {
    return await CityEntity.find();
  }

  async findOne(id: number): Promise<CityEntity> {
    try {
      return await CityEntity.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
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
