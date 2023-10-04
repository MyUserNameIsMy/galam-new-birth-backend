import { Column, Entity, ManyToOne } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { CountryEntity } from '../../country/entities/country.entity';

@Entity('cities')
export class CityEntity extends RootAbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => CountryEntity, (country) => country.cities, {
    onDelete: 'CASCADE',
  })
  country: CountryEntity;
}
