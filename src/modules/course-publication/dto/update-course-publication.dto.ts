import { PartialType } from '@nestjs/swagger';
import { CreateCoursePublicationDto } from './create-course-publication.dto';

export class UpdateCoursePublicationDto extends PartialType(CreateCoursePublicationDto) {}
