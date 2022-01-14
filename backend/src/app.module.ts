import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo/warmup-app', { useNewUrlParser: true }),
    HttpModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
