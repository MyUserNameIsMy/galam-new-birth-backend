import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateWorkingStatusDto {
  @ApiProperty({ description: 'Working status', type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  is_working_time: boolean;
}
