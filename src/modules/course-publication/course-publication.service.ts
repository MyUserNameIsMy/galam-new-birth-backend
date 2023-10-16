import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateCoursePublicationDto,
  LessonDto,
} from './dto/create-course-publication.dto';
import { UpdateCoursePublicationDto } from './dto/update-course-publication.dto';
import { CoursePublicationEntity } from './entities/course-publication.entity';
import { CourseEntity } from '../course/entities/course.entity';
import { In } from 'typeorm';
import { CourseScheduleEntity } from './entities/course-schedule.entity';
import { CoursePublicationFilterDto } from './dto/course-publication-filter.dto';
import { WeekDayEntity } from '../../database/entities/week-day.entity';
import { CoursePublicationStatusEnum } from '../../common/enums/course-publication-status.enum';
import { CourseCategoryEntity } from '../course/entities/course-category.entity';

@Injectable()
export class CoursePublicationService {
  async create(
    createCoursePublicationDto: CreateCoursePublicationDto,
  ): Promise<CoursePublicationEntity | any> {
    try {
      const week_days = await WeekDayEntity.find({
        where: {
          week_day: In(
            createCoursePublicationDto.lessons_per_week.flatMap(
              (item) => item.week_day,
            ),
          ),
        },
      });
      const course = await CourseEntity.findOneOrFail({
        relations: ['organization'],
        where: { id: createCoursePublicationDto.course_id },
      });

      const course_publication = new CoursePublicationEntity();
      course_publication.start_date = createCoursePublicationDto.start_date;
      course_publication.end_date = createCoursePublicationDto.end_date;
      course_publication.capacity = createCoursePublicationDto.capacity;
      course_publication.course = course;
      course_publication.week_days = week_days;

      const { schedule, clashes } = await this.createSchedule(
        createCoursePublicationDto.start_date,
        createCoursePublicationDto.end_date,
        createCoursePublicationDto.lessons_per_week,
        course_publication,
      );
      if (clashes.length > 0) {
        throw new BadRequestException(`Clash exist. ${clashes}`);
      }
      console.table(schedule);

      await course_publication.save();
      await CourseScheduleEntity.save(schedule);
      return course_publication;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createSchedule(
    start_date: Date,
    end_date: Date,
    lessons_per_week: LessonDto[],
    course_publication: CoursePublicationEntity,
  ) {
    try {
      const current_date = new Date(start_date);

      const week_days = Array.from(
        new Set(lessons_per_week.map((item) => item.week_day)),
      );

      const dates = [];
      while (current_date <= end_date) {
        if (week_days.includes(current_date.getDay())) {
          dates.push(new Date(current_date));
        }
        current_date.setDate(current_date.getDate() + 1);
      }

      const room_by_day = {};
      for (const lesson of lessons_per_week) {
        room_by_day[lesson.week_day] = lesson.room;
      }

      const time_slots_by_date = {};
      for (const lesson of lessons_per_week) {
        time_slots_by_date[lesson.week_day] = lesson.time_slots;
      }

      const schedule: Partial<CourseScheduleEntity>[] = [];
      const clashes = [];
      for (const date of dates) {
        for (const time_slot of time_slots_by_date[date.getDay()]) {
          if (
            await CourseScheduleEntity.findOne({
              where: {
                room: room_by_day[date.getDay()],
                date: date,
                start_time: time_slot.start_time,
                end_time: time_slot.end_time,
                course_publication: {
                  course: {
                    organization: {
                      id: course_publication.course.organization.id,
                    },
                  },
                },
              },
            })
          ) {
            clashes.push({
              course_publication,
              date,
              week_day: date.getDay(),
              room: room_by_day[date.getDay()],
              start_time: time_slot.start_time,
              end_time: time_slot.end_time,
            });
          }
          schedule.push({
            course_publication,
            date,
            week_day: date.getDay(),
            room: room_by_day[date.getDay()],
            start_time: time_slot.start_time,
            end_time: time_slot.end_time,
          });
        }
      }

      return { schedule, clashes };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(
    filter: CoursePublicationFilterDto,
  ): Promise<CoursePublicationEntity[]> {
    console.table(filter);
    try {
      let week_days = null;
      if (filter?.week_days) {
        week_days = await WeekDayEntity.find({
          where: {
            week_day: In(filter.week_days),
          },
        });
      }
      console.log(week_days);
      return await CoursePublicationEntity.find({
        relations: [
          'course_schedules',
          'course',
          'course.organization',
          'course.organization.city',
        ],
        where: {
          course: {
            organization: {
              city: filter?.city_ids ? { id: In(filter.city_ids) } : {},
            },
          },
          week_days: week_days
            ? { id: In(week_days.map((item) => item.id)) }
            : {},
        },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAllOpen(filter: CoursePublicationFilterDto, page = 0, limit = 5) {
    let week_days = null;
    if (filter?.week_days) {
      week_days = await WeekDayEntity.find({
        where: {
          week_day: In(filter.week_days),
        },
      });
    }
    let course_categories = null;
    if (filter?.course_category_ids) {
      course_categories = await CourseCategoryEntity.find({
        where: {
          id: In(filter.course_category_ids),
        },
      });
    }

    return {
      course_publications: await CoursePublicationEntity.find({
        relations: [
          'course_schedules',
          'course',
          'course.organization',
          'course.organization.city',
        ],
        where: {
          status: CoursePublicationStatusEnum.OPEN_RECRUITMENT,
          course: {
            organization: {
              city: filter?.city_ids ? { id: In(filter.city_ids) } : {},
            },
            course_category: course_categories
              ? { id: In(course_categories.map((item) => item.id)) }
              : {},
            ...(filter?.course_types
              ? { course_type: In(filter.course_types) }
              : {}),
          },
          week_days: week_days
            ? { id: In(week_days.map((item) => item.id)) }
            : {},
        },
        ...(page && limit
          ? {
              skip: page * limit,
              take: limit,
            }
          : {}),
      }),
      page: page,
      limit: limit,
    };
  }

  async findOne(id: number) {
    try {
      return await CoursePublicationEntity.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateStatus(
    id: number,
    updateCoursePublicationDto: UpdateCoursePublicationDto,
  ): Promise<{ message: string }> {
    try {
      await CoursePublicationEntity.update({ id }, updateCoursePublicationDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return {
      message: 'Successfully updated',
    };
  }

  async remove(id: number) {
    try {
      const course_publication = await CoursePublicationEntity.findOneOrFail({
        where: { id },
      });
      await course_publication.remove();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return {
      message: 'Successfully deleted',
    };
  }

  async removeSchedule(id: number): Promise<{ message: string }> {
    try {
      const schedule = await CourseScheduleEntity.find({
        where: {
          course_publication: {
            id: id,
          },
        },
      });
      await CourseScheduleEntity.remove(schedule);
      return { message: 'Successfully deleted' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
