import { Controller, Get, Res, HttpStatus, Query, NotFoundException, HttpCode, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) { }
    
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.articleService.findAll();
  }

  @Delete()
    async deleteArticle(@Res() res, @Query('articleID') articleID) {
      const article = await this.articleService.deleteArticle(articleID);
      if (!article) throw new NotFoundException('Article does not exist');
      return res.status(HttpStatus.OK).json({
        message: 'Article has been deleted',
        article
      })
  }
  
  @Get('/all')
    async getArticles() {
      return this.articleService.getArticles();
    }
}
