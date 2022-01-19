import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(async () => {
    const ArticleServiceProvider = {
      provide: ArticleService,
      useFactory: () => ({
        findAll: jest.fn(),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticleService, ArticleServiceProvider],
    }).compile();

    articleService = app.get<ArticleService>(ArticleService);
    articleController = app.get<ArticleController>(ArticleController);
  });

  describe('findAll', () => {
    it('should call findAll articles service', async () => {
        articleController.findAll();
      expect(articleService.findAll).toHaveBeenCalled();
    });
  });
});