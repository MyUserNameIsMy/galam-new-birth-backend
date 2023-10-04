import { Column, Entity, Point } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';

@Entity('organizations')
export class OrganizationEntity extends RootAbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'text' })
  about: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'geometry' })
  location: Point;

  @Column({ type: 'varchar', length: 500, nullable: true })
  photo_path: string;
}
