import { Column, Entity, OneToMany } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { CourseEntity } from './course.entity';

@Entity('course_categories')
export class CourseCategoryEntity extends RootAbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => CourseEntity, (course) => course.course_category)
  courses: CourseEntity[];
}
