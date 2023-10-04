import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOrganizationDto {
  @ApiProperty({ description: 'Name of the Organization' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Phone of the Organization' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ description: 'Email of the Organization' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'About of the Organization' })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty({ description: 'City Id of the Organization' })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  city_id: number;

  @ApiProperty({ description: 'Address of the Organization' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Longitude of the Organization' })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  lon: number;

  @ApiProperty({ description: 'latitude of the Organization' })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  lat: number;

  @ApiProperty({
    description: 'Phone of the Organization',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  photo: Express.Multer.File;
}
