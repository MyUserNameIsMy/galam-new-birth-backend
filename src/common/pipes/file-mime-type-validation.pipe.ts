import { Injectable, PipeTransform } from '@nestjs/common';
import path from 'path';

@Injectable()
export class FileMimeTypeValidationPipe implements PipeTransform {
  transform(value: any) {
    const allowed_file_extensions = ['.jpg', '.png'];
    return allowed_file_extensions.includes(path.extname(value.originalname));
  }
}
