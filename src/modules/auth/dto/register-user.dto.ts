import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ description: 'Firstname' })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({ description: 'Lastname' })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ description: 'Email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ description: 'Telegram Id' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(9, 9)
  telegram_id: string;
}
