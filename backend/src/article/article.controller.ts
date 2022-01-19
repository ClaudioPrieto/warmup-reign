import { Controller, Get, Param, HttpStatus, Query, NotFoundException, HttpCode, Delete } from '@nestjs/common';
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
  @HttpCode(HttpStatus.OK)
    async deleteArticle(@Query('articleID') articleID) {
      return await this.articleService.deleteArticle(articleID);
  }
}
