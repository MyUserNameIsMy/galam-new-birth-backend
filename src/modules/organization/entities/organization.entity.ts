import { Column, Entity, ManyToOne, OneToMany, Point } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { CityEntity } from '../../city/entities/city.entity';
import { OrganizationStatusEnum } from '../../../common/enums/organization-status.enum';
import { CourseEntity } from '../../course/entities/course.entity';

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

  @Column({
    type: 'enum',
    enum: OrganizationStatusEnum,
    default: OrganizationStatusEnum.NEW,
  })
  status: OrganizationStatusEnum;

  @ManyToOne(() => CityEntity, (city) => city.organizations, {
    onDelete: 'CASCADE',
  })
  city: CityEntity;

  @OneToMany(() => CourseEntity, (course) => course.organization, {
    cascade: true,
  })
  courses: CourseEntity[];
}
