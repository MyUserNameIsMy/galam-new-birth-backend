import { Injectable } from '@nestjs/common';
import { Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { BotService } from './bot.service';

@Injectable()
@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(`Hi ${ctx.message.from.first_name}`);
  }
}
