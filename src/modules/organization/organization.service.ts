import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationEntity } from './entities/organization.entity';
import { CityEntity } from '../city/entities/city.entity';
import { Point } from 'typeorm';
import { UpdateOrganizationStatusDto } from './dto/update-organization-status.dto';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class OrganizationService {
  async create(
    createOrganizationDto: CreateOrganizationDto,
    photo: Express.Multer.File,
    account: any,
  ): Promise<OrganizationEntity> {
    if (account.organization_id !== -1) {
      throw new BadRequestException('Can not create new organization');
    }
    try {
      const user = await UserEntity.findOneOrFail({
        where: { telegram_id: account.telegram_id },
      });
      const city = await CityEntity.findOneOrFail({
        where: { id: createOrganizationDto.city_id },
      });
      const organization = new OrganizationEntity();
      const location: Point = {
        type: 'Point',
        coordinates: [createOrganizationDto.lon, createOrganizationDto.lat],
      };
      console.log(photo);
      organization.name = createOrganizationDto.name;
      organization.phone = createOrganizationDto.phone;
      organization.email = createOrganizationDto.email;
      organization.about = createOrganizationDto.about;
      organization.city = city;
      organization.address = createOrganizationDto.address;
      organization.location = location;
      if (photo?.path) organization.photo_path = photo.path;

      await organization.save();
      user.organization = organization;
      await user.save();
      return organization;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(): Promise<OrganizationEntity[]> {
    return await OrganizationEntity.find();
  }

  async findOne(id: number): Promise<OrganizationEntity> {
    return await OrganizationEntity.findOneOrFail({ where: { id } });
  }

  //TODO: add status flow check
  async updateStatus(
    id: number,
    updateOrganizationStatusDto: UpdateOrganizationStatusDto,
  ): Promise<OrganizationEntity> {
    try {
      const organization = await OrganizationEntity.findOneOrFail({
        where: { id },
      });
      organization.status = updateOrganizationStatusDto.status;
      return await organization.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const organization = await OrganizationEntity.findOneOrFail({
        where: { id },
      });
      await organization.remove();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return {
      message: 'Successfully deleted',
    };
  }

  async getPhoto(id: number): Promise<string> {
    try {
      const organization = await OrganizationEntity.findOneOrFail({
        where: { id },
      });
      return organization.photo_path;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
