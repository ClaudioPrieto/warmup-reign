import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface';
import { CreateArticleDTO } from './dto/create-article.dto';
import { HttpService } from '@nestjs/axios'
import { map } from 'rxjs/operators'

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>,
              private httpService: HttpService) {}

  async getAllArticle(): Promise<Article[]> {
    const articles = await this.articleModel.find().exec();
    return articles;
  }

  async deleteArticle(customerID): Promise<any> {
    const deletedCustomer = await this.articleModel.findByIdAndRemove(customerID);
    return deletedCustomer;
  }

  async addArticle(createArticleDTO: CreateArticleDTO): Promise<Article> {
    return await new this.articleModel({
      ...createArticleDTO,
      createdAt: new Date(),
    }).save();
  }

  async getArticles() {
    return await this.httpService.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs').pipe(
      map((resp) => resp.data),
      map((data) => {
        return data.hits.map( article => {
          return new this.articleModel({ 
            uid: article.story_id,
            title: article.title || article.story_title,
            author: article.author,
            url: article.url || article.story_url,
            release_date: article.created_at,
            createdAt: new Date()
          }).save()
        })
      }),
    )
  }
}

