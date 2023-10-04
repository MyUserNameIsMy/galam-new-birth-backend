import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { OrganizationEntity } from '../../organization/entities/organization.entity';
import { CoursePublicationEntity } from '../../course-publication/entities/course-publication.entity';

@Entity('courses')
export class CourseEntity extends RootAbstractEntity {
  @Column()
  name: string;

  @Column()
  teacher: string;

  @Column()
  hour_per_week: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  requirements: string;

  @Column({ type: 'text' })
  syllabus: string;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.courses, {
    onDelete: 'CASCADE',
  })
  organization: OrganizationEntity;

  @OneToMany(
    () => CoursePublicationEntity,
    (course_publication) => course_publication.course,
    { cascade: true },
  )
  course_publications: CoursePublicationEntity[];
}
