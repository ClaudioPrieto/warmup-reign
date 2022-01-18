import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDTO } from './dto/create-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) { }
    
  @Get()
  async getAllArticle(@Res() res) {
    const articles = await this.articleService.getAllArticle();
    return res.status(HttpStatus.OK).json(articles);
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
