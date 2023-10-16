import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('File')
@Controller('')
export class FileController {
  @Get('uploads/photos/:filename')
  async getPhoto(@Param('filename') filename: string, @Res() res: Response) {
    fs.access(
      path.join(__dirname, '../../../uploads/photos', filename),
      fs.constants.F_OK,
      (err) => {
        if (err) {
          throw new BadRequestException(err.message);
        }
        res.sendFile(path.join(__dirname, '../../../uploads/photos', filename));
      },
    );
  }
}
