import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface';
import { CreateArticleDTO } from './dto/create-article.dto';
import { HttpService } from '@nestjs/axios'
import { map } from 'rxjs/operators'
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>,
              private httpService: HttpService) {}

  async getAllArticle(): Promise<Article[]> {
    const articles = await this.articleModel.find({ deleted: false }).exec();
    return articles;
  }

  async deleteArticle(articleID): Promise<any> {
    const deletedCustomer = await this.articleModel.findByIdAndUpdate(articleID, { deleted: true });
    return deletedCustomer;
  }

  async addArticle(createArticleDTO: CreateArticleDTO): Promise<Article> {
    return await new this.articleModel({
      ...createArticleDTO,
      createdAt: new Date(),
    }).save();
  }

  @Cron('45 * * * * *')
  async getArticles() {
    var articlesUID:number[] = await this.articleModel.find().distinct('uid');

    return await this.httpService.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs').pipe(
      map((resp) => resp.data),
      map((data) => {
        return data.hits.map( article => {
          if (!articlesUID.includes(article.story_id)) {
            return new this.articleModel({ 
              uid: article.story_id,
              title: article.title || article.story_title,
              author: article.author,
              url: article.url || article.story_url,
              release_date: article.created_at
            }).save()
          } 
        })
      }),
    )
  }
}

