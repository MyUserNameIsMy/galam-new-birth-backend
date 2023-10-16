import { Column, Entity, OneToMany } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { CityEntity } from '../../city/entities/city.entity';

@Entity('countries')
export class CountryEntity extends RootAbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => CityEntity, (city) => city.country, {
    cascade: true,
  })
  cities: CityEntity[];
}
