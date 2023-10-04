import { Column, Entity, ManyToOne } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { CourseEntity } from '../../course/entities/course.entity';
import { CoursePublicationStatusEnum } from '../../../common/enums/course-publication-status.enum';

@Entity('course_publications')
export class CoursePublicationEntity extends RootAbstractEntity {
  @Column({ type: 'timestamptz' })
  start_date: Date;

  @Column({ type: 'timestamptz' })
  end_date: Date;

  @Column()
  capacity: number;

  @Column({
    type: 'enum',
    enum: CoursePublicationStatusEnum,
    default: CoursePublicationStatusEnum.NEW,
  })
  status: CoursePublicationStatusEnum;

  @ManyToOne(() => CourseEntity, (course) => course.course_publications, {
    onDelete: 'CASCADE',
  })
  course: CourseEntity;
}
