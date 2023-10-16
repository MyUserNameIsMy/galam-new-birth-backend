import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtUserStrategy } from './strategies/jwt-user.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtUserStrategy],
})
export class AuthModule {}
