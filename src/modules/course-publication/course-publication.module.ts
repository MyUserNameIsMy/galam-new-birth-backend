import { Module } from '@nestjs/common';
import { CoursePublicationService } from './course-publication.service';
import { CoursePublicationController } from './course-publication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursePublicationEntity } from './entities/course-publication.entity';
import { CourseScheduleEntity } from './entities/course-schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoursePublicationEntity, CourseScheduleEntity]),
  ],
  controllers: [CoursePublicationController],
  providers: [CoursePublicationService],
})
export class CoursePublicationModule {}
