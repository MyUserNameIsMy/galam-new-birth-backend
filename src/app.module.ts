import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from './config/jwt.config';
import { getOrmAsyncConfig } from './config/orm-async.config';
import { OrganizationModule } from './modules/organization/organization.module';
import { CountryModule } from './modules/country/country.module';
import { CityModule } from './modules/city/city.module';
import { CourseModule } from './modules/course/course.module';
import { CoursePublicationModule } from './modules/course-publication/course-publication.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { getTelegrafAsyncConfig } from './config/telegraf-async.config';
import { BotModule } from './modules/bot/bot.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { WeekDayEnum } from './common/enums/week-day.enum';
import { WeekDayEntity } from './database/entities/week-day.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeekDayEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(getOrmAsyncConfig()),
    JwtModule.registerAsync(getJWTConfig()),
    TelegrafModule.forRootAsync(getTelegrafAsyncConfig()),
    BotModule,
    OrganizationModule,
    CountryModule,
    CityModule,
    CourseModule,
    CoursePublicationModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
