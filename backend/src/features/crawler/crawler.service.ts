import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { NewsService } from '../news/news.service';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { CreateNewsDto } from '../news/news.dto';


@Injectable()
export class CrawlerService {
    constructor(
        private readonly httpService: HttpService,
        private readonly newsService: NewsService
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    async fetchNews() {
        try {
            const response = await firstValueFrom(this.httpService.get(`${process.env.PLG_URL}/news`));
            const $ = cheerio.load(response.data);
            const newsList = $('#news-list');
            newsList.children().map(async (_, element) => {
                const title = $(element).find('.fs16').text();
                if (!(await this.newsService.existsByTitle(title))) {
                    const tag = $(element).find('.news_cate').text();
                    const publishedAt = $(element).find('.opacity-5').text();
                    const newsUrl = `${process.env.PLG_URL}${$(element).find('.news_img_pattern').attr('href')}`;
                    const newsImgUrl = `${process.env.PLG_URL}${$(element).find('.lazyload').attr('data-src')}`;
                    // get content
                    const newsContentResponse = await firstValueFrom(this.httpService.get(newsUrl));
                    const newsContentHtml = cheerio.load(newsContentResponse.data);
                    const content = newsContentHtml('.news_detail_content').text();
                    // download image
                    const newsImgResponse = await firstValueFrom(this.httpService.get(newsImgUrl, { responseType: 'stream' })); 
                    const photoFilename = uuidv4();
                    const imgUrl = `./uploads/news/${photoFilename}.jpg`
                    const writer = fs.createWriteStream(imgUrl);
                    newsImgResponse.data.pipe(writer);
                    const newCreateNewsDto: CreateNewsDto = {
                        title: title,
                        content: content,
                        tag: tag,
                        publishedAt: publishedAt,
                        imgUrl: imgUrl ? imgUrl : './uploads/news/default.png'
                    };
                    this.newsService.create(newCreateNewsDto);
                }
            })
        } catch (error) {
            console.error('Error occurred while crawling news data:', error);
        }
    }

}
