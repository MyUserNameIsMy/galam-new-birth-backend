import { Injectable } from '@nestjs/common';
import { InlineKeyboardMarkup } from 'telegraf/src/core/types/typegram';

@Injectable()
export class BotService {
  async submitMenuButton(): Promise<InlineKeyboardMarkup> {
    return {
      inline_keyboard: [
        [
          {
            text: 'Add expenditure',
            web_app: {
              url: 'https://skylot-expenditure.hopto.org/expenditure/expenditure-submit',
            },
          },
        ],
      ],
    };
  }
}
