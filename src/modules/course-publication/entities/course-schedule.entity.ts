import { Column, Entity, ManyToOne } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { CoursePublicationEntity } from './course-publication.entity';
import { WeekDayEnum } from '../../../common/enums/week-day.enum';
import { ClassLanguageEnum } from '../../../common/enums/class-language.enum';

@Entity('course_schedules')
export class CourseScheduleEntity extends RootAbstractEntity {
  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ type: 'time' })
  start_time: Date;

  @Column({ type: 'time' })
  end_time: Date;

  @Column({ type: 'enum', enum: WeekDayEnum })
  week_day: WeekDayEnum;

  @Column()
  room: string;

  @Column({
    type: 'enum',
    enum: ClassLanguageEnum,
    default: ClassLanguageEnum.MULTI_LANG,
  })
  language: ClassLanguageEnum;

  @ManyToOne(
    () => CoursePublicationEntity,
    (course_publication) => course_publication.course_schedules,
    {
      onDelete: 'CASCADE',
    },
  )
  course_publication: CoursePublicationEntity;
}
