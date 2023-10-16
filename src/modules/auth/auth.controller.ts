import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/user')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<{ access_token: string } | boolean> {
    const user = await this.authService.registerUser(registerUserDto);
    return await this.authService.generateTokenUser(user.telegram_id);
  }

  @Get('login/:telegram_id')
  async getToken(
    @Param('telegram_id') telegram_id: string,
  ): Promise<{ access_token: string } | boolean> {
    return await this.authService.generateTokenUser(telegram_id);
  }
}
