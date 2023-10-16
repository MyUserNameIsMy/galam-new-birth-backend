import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { CourseEntity } from '../../course/entities/course.entity';
import { CoursePublicationStatusEnum } from '../../../common/enums/course-publication-status.enum';
import { CourseScheduleEntity } from './course-schedule.entity';

import { WeekDayEntity } from '../../../database/entities/week-day.entity';

@Entity('course_publications')
export class CoursePublicationEntity extends RootAbstractEntity {
  @Column({ type: 'timestamptz' })
  start_date: Date;

  @Column({ type: 'timestamptz' })
  end_date: Date;

  @ManyToMany(() => WeekDayEntity)
  @JoinTable()
  week_days: WeekDayEntity[];

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

  @OneToMany(
    () => CourseScheduleEntity,
    (course_schedule) => course_schedule.course_publication,
    { cascade: true },
  )
  course_schedules: CourseScheduleEntity[];
}
