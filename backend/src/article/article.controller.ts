import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDTO } from './dto/create-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private customerService: ArticleService) { }
    
  @Get()
  async getAllArticle(@Res() res) {
    const articles = await this.customerService.getAllArticle();
    return res.status(HttpStatus.OK).json(articles);
  }

  @Delete()
    async deleteArticle(@Res() res, @Query('articleID') articleID) {
      const article = await this.customerService.deleteArticle(articleID);
      if (!article) throw new NotFoundException('Article does not exist');
      return res.status(HttpStatus.OK).json({
        message: 'Customer has been deleted',
        article
      })
  }

  @Post()
    async addCustomer(@Res() res, @Body() createCustomerDTO: CreateArticleDTO) {
      const customer = await this.customerService.addArticle(createCustomerDTO);
      return res.status(HttpStatus.OK).json({
        message: "Article has been created successfully",
        customer
      })
    }
}
