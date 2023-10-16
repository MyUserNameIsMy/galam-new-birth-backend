import { Test, TestingModule } from '@nestjs/testing';
import { CoursePublicationController } from './course-publication.controller';
import { CoursePublicationService } from './course-publication.service';

describe('CoursePublicationController', () => {
  let controller: CoursePublicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursePublicationController],
      providers: [CoursePublicationService],
    }).compile();

    controller = module.get<CoursePublicationController>(CoursePublicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
