import { Test, TestingModule } from '@nestjs/testing';
import { CoursePublicationService } from './course-publication.service';

describe('CoursePublicationService', () => {
  let service: CoursePublicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursePublicationService],
    }).compile();

    service = module.get<CoursePublicationService>(CoursePublicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
