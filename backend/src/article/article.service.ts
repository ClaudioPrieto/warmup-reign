import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface';
import { HttpService } from '@nestjs/axios'
import { map, tap } from 'rxjs/operators'
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>,
              private httpService: HttpService) {}

  async findAll(): Promise<Article[]> {
    const articles = await this.articleModel.find({ deleted: false }).sort({release_date: -1}).exec();
    return articles;
  }

  async deleteArticle(articleID): Promise<any> {
    const deletedCustomer = await this.articleModel.findByIdAndUpdate(articleID, { deleted: true });
    return deletedCustomer;
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async getArticles(): Promise<any> {
    var mongoose = require('mongoose');
    // console.log(mongoose.connection.readyState);

    var articlesUID:number[] = await this.articleModel.find().distinct('uid');

    // console.log(mongoose.connection.readyState);
    mongoose.connect('mongodb://mongo/warmup-app', {useNewUrlParser: true});
    console.log(mongoose.connection.readyState);
    
    return this.httpService.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs&tags=story').pipe(
      tap(() => console.log('sssss')),
      map((resp) => resp.data),
      tap((data) => console.log(data)),
      map((data) => {
        return data.hits.map( article => {
          if (!articlesUID.includes(article.story_id) && (article.title || article.story_title)) {
            return new this.articleModel({ 
              uid: article.story_id,
              title: article.title || article.story_title,
              author: article.author,
              url: article.url || article.story_url,
              release_date: article.created_at
            }).save(function(err){
              if (err) {
                console.log("Error: " + err);
              } else {
                console.log("success! You saved a new item.");
              }
            });
          } 
        })
      }),
    )
  }
}

