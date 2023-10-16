import {
  TelegrafModuleAsyncOptions,
  TelegrafModuleOptions,
} from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getTelegrafAsyncConfig = (): TelegrafModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TelegrafModuleOptions => ({
    token: configService.get('TELEGRAM_BOT_TOKEN'),
  }),
});
