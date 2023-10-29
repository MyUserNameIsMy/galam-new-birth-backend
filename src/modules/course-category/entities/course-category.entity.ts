import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { CourseEntity } from '../../course/entities/course.entity';

@Entity('course_categories')
@Tree('materialized-path')
export class CourseCategoryEntity extends RootAbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => CourseEntity, (course) => course.course_category)
  courses: CourseEntity[];

  @TreeChildren()
  children: CourseCategoryEntity[];

  @TreeParent()
  parent: CourseCategoryEntity;
}
