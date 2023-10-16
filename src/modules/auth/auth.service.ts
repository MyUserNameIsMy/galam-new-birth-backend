import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    try {
      const user = new UserEntity();
      user.firstname = registerUserDto.firstname;
      user.lastname = registerUserDto.lastname;
      user.email = registerUserDto.email;
      user.phone = registerUserDto.phone;
      user.telegram_id = registerUserDto.telegram_id;
      return await user.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async generateTokenUser(
    telegram_id: string,
  ): Promise<{ access_token: string } | boolean> {
    try {
      const user = await UserEntity.findOneOrFail({
        relations: ['organization'],
        where: { telegram_id },
      });
      return {
        access_token: this.jwtService.sign({
          id: user.id,
          telegram_id: user.telegram_id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          organization_id: user.organization?.id || -1,
        }),
      };
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        return false;
      }
      throw new BadRequestException(err.message);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }
}
