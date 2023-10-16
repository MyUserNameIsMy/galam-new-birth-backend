import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseCategoryDto {
  @ApiProperty({ description: 'Course Category' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
