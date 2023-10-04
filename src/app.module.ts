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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(getOrmAsyncConfig()),
    JwtModule.registerAsync(getJWTConfig()),
    OrganizationModule,
    CountryModule,
    CityModule,
    CourseModule,
    CoursePublicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
