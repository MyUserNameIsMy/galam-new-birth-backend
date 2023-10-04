import { ApiProperty } from '@nestjs/swagger';
import { OrganizationStatusEnum } from '../../../common/enums/organization-status.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrganizationStatusDto {
  @ApiProperty({ description: 'Organization status' })
  @IsNotEmpty()
  @IsEnum(OrganizationStatusEnum)
  status: OrganizationStatusEnum;
}
