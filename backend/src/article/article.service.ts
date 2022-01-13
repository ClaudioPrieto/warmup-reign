import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) { }

  async getAllArticle(): Promise<Article[]> {
    const articles = await this.articleModel.find().exec();
    return articles;
  }

  async deleteArticle(customerID): Promise<any> {
    const deletedCustomer = await this.articleModel.findByIdAndRemove(customerID);
    return deletedCustomer;
  }
}
