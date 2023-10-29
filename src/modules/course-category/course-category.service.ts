import { BadRequestException, Injectable } from '@nestjs/common';
import { CourseCategoryEntity } from './entities/course-category.entity';
import { getCourseCategories } from '../../database/dictionaries/course-category.dictionary';
import { DataSource } from 'typeorm';

@Injectable()
export class CourseCategoryService {
  constructor(private readonly dataSource: DataSource) {}

  async seed(): Promise<{ message: string }> {
    try {
      await CourseCategoryEntity.delete({});
      const categories = getCourseCategories();
      for (const [key, value] of Object.entries(categories)) {
        const parent = new CourseCategoryEntity();
        parent.name = key;
        await parent.save();
        for (const item of value) {
          const child = new CourseCategoryEntity();
          child.name = item;
          child.parent = parent;
          await child.save();
        }
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return {
      message: 'Successfully seeded',
    };
  }

  async findAllTree() {
    return await this.dataSource
      .getTreeRepository(CourseCategoryEntity)
      .findTrees();
  }

  async findOne(id: number) {
    try {
      return await CourseCategoryEntity.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
