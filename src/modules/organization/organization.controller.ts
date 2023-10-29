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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrganizationEntity } from './entities/organization.entity';
import { UpdateOrganizationStatusDto } from './dto/update-organization-status.dto';
import type { Response } from 'express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt-user'))
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
    @Request() req,
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
    return await this.organizationService.create(
      createOrganizationDto,
      photo,
      req.user,
    );
  }

  @Get()
  async findAll(): Promise<OrganizationEntity[]> {
    return await this.organizationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrganizationEntity> {
    return await this.organizationService.findOne(+id);
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
