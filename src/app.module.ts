import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from './config/jwt.config';
import { getOrmAsyncConfig } from './config/orm-async.config';
import { OrganizationModule } from './modules/organization/organization.module';
import { CountryModule } from './modules/country/country.module';
import { CityModule } from './modules/city/city.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
