import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { getPlaces } from '../../database/dictionaries/place.dictionary';
import { CountryEntity } from './entities/country.entity';
import { CityEntity } from '../city/entities/city.entity';
import { CountryController } from './country.controller';

@Injectable()
export class CountryService {
  async seed(): Promise<{ message: string }> {
    const countries_: { name: string; cities: string[] }[] = getPlaces();
    const countries: CountryEntity[] = [];
    console.table(countries_);
    countries_.forEach((country_: { name: string; cities: string[] }): void => {
      const country: CountryEntity = new CountryEntity();
      const cities: CityEntity[] = [];
      country.name = country_.name;
      country_.cities.forEach((name: string) => {
        const city = new CityEntity();
        city.name = name;
        cities.push(city);
      });
      country.cities = cities;
      countries.push(country);
    });

    try {
      await CountryEntity.save(countries);
    } catch (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'Successfully seeded',
    };
  }

  async findAll(): Promise<CountryEntity[]> {
    return await CountryEntity.find({
      relations: ['cities'],
    });
  }

  async findOne(id: number): Promise<CountryEntity> {
    try {
      return await CountryEntity.findOneOrFail({
        where: { id },
        relations: ['cities'],
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async removeAll(): Promise<{ message: string }> {
    try {
      await CountryEntity.delete({});
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return {
      message: 'Successfully deleted',
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const country = await CountryEntity.findOneOrFail({ where: { id } });
      await country.remove();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return {
      message: 'Successfully deleted',
    };
  }
}
