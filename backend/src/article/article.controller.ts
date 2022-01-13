import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private customerService: ArticleService) { }
    
  @Get('articles')
  async getAllCustomer(@Res() res) {
    const customers = await this.customerService.getAllArticle();
    return res.status(HttpStatus.OK).json(customers);
  }

  @Delete('/delete')
    async deleteCustomer(@Res() res, @Query('customerID') customerID) {
      const customer = await this.customerService.deleteArticle(customerID);
      if (!customer) throw new NotFoundException('Customer does not exist');
      return res.status(HttpStatus.OK).json({
        message: 'Customer has been deleted',
        customer
      })
  }
}
