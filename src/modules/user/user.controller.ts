import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt-user'))
  create(@Request() req) {
    return req.user;
  }
}
