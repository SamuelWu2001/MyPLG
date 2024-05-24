import { Controller, Get, Post, Body } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.model';
import { CreateNewsDto } from './news.dto';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get()
    async findAll(): Promise<News[]> {
        return this.newsService.findAll();
    }

    @Post()
    async create(@Body() createNewsDto: CreateNewsDto): Promise<News> {
        return this.newsService.create(createNewsDto);
    }
}
