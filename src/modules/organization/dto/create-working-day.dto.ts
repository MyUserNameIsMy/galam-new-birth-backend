import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { WeekDayEnum } from '../../../common/enums/week-day.enum';
import { Type } from 'class-transformer';

export class CreateWorkingDayDto {
  @ApiProperty({ description: 'Array of working days' })
  @ValidateNested({ each: true })
  @Type(() => WorkingIntervalDto)
  working_days: WorkingIntervalDto[];

  @ApiProperty({ description: 'Organization Id' })
  @IsNotEmpty()
  @IsNumber()
  organization_id: number;
}

class WorkingIntervalDto {
  @ApiProperty({ description: 'Week day' })
  @IsNotEmpty()
  @IsEnum(WeekDayEnum)
  week_day: WeekDayEnum;
}
