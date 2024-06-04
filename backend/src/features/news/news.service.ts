import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './news.model';
import { Model } from 'mongoose';
import { CreateNewsDto } from './news.dto';

@Injectable()
export class NewsService {
    constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

    async create(createNewsDto: CreateNewsDto): Promise<News> {
        const createdNews = new this.newsModel(createNewsDto);
        return createdNews.save();
    }

    async findAll(): Promise<News[]> {
        return this.newsModel.find().exec();
    }

    async existsByTitle(newsTitle: string): Promise<boolean> {
        const news = await this.newsModel.findOne({ title: newsTitle }).exec();
        return !!news;
    }

}
