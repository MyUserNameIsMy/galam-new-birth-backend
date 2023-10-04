import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrganizationEntity } from './entities/organization.entity';
import { UpdateOrganizationStatusDto } from './dto/update-organization-status.dto';
import type { Response } from 'express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/photos',
        filename: (req, file, cb) => {
          cb(null, `${uuid()}${path.extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: '.(png|jpeg|jpg)' })
        .build({
          errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
          fileIsRequired: false,
        }),
    )
    photo: Express.Multer.File,
  ) {
    return await this.organizationService.create(createOrganizationDto, photo);
  }

  @Get()
  async findAll(): Promise<OrganizationEntity[]> {
    return await this.organizationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrganizationEntity> {
    return await this.organizationService.findOne(+id);
  }

  @Get(':id/photo')
  async getPhoto(@Param('id') id: string, @Res() res: Response) {
    const photo_path: string | null = await this.organizationService.getPhoto(
      +id,
    );
    if (!photo_path) throw new BadRequestException('No photo');

    res.sendFile(path.join(__dirname, '../../../', photo_path));
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrganizationStatusDto: UpdateOrganizationStatusDto,
  ): Promise<OrganizationEntity> {
    return await this.organizationService.updateStatus(
      +id,
      updateOrganizationStatusDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.organizationService.remove(+id);
  }
}
