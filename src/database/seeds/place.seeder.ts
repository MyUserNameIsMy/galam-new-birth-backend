import { Seeder } from 'typeorm-extension';
import { getPlaces } from '../dictionaries/place.dictionary';
import { CountryEntity } from '../../modules/country/entities/country.entity';
import { CityEntity } from '../../modules/city/entities/city.entity';
import { DataSource, Repository } from 'typeorm';

export default class PlaceSeeder implements Seeder {
  async run(datasource: DataSource): Promise<void> {
    const repository: Repository<CountryEntity> =
      datasource.getRepository(CountryEntity);
    const countries_: { name: string; cities: string[] }[] = getPlaces();
    const countries: CountryEntity[] = [];

    countries_.forEach((country_: { name: string; cities: string[] }): void => {
      const country: CountryEntity = new CountryEntity();
      country.name = country_.name;
      country_.cities.forEach((name: string) => {
        const city = new CityEntity();
        city.name = name;
        country.cities.push(city);
      });
      countries.push(country);
    });

    await repository.insert(countries);
  }
}
