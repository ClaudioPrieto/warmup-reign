import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';

class ApiServiceMock {
  findAll() {
    return [];
  }
  deleteArticle(articleID: string) {
    return null;
  }
}
describe.only("ArticleService", () => {

  let articleService: ArticleService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ArticleService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService, ApiServiceProvider
      ],
    }).compile();
    articleService = module.get<ArticleService>(ArticleService);
  })

  it('should call findOneNote method with expected param', async () => {
    const findAll = jest.spyOn(articleService, 'findAll');
    articleService.findAll();
    expect(findAll).toHaveBeenCalled();
  });

  it('should call deleteNote method with expected param', async () => {
    const deleteNoteSpy = jest.spyOn(articleService, 'deleteArticle');
    const articleID = '61e56630f7ff0570';
    articleService.deleteArticle(articleID);
    expect(deleteNoteSpy).toHaveBeenCalledWith(articleID);
  });
})
