import { Controller, Get, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.model';
import { CreateNewsDto } from './news.dto';
import { ApiOperation, ApiTags, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config';

@ApiTags('news')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @ApiOperation({ summary: 'Get all news' })
    @ApiResponse({ status: 201, description: 'Return all news' })
    @Get()
    async findAll(): Promise<News[]> {
        return this.newsService.findAll();
    }

    @ApiOperation({ summary: 'Create news' })
    @ApiResponse({ status: 201, description: 'The news has been successfully created.' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('photo', MulterConfig))
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'The title of the news', example: 'Playoff is comming' },
                content: { type: 'string', description: 'The content of the news', example: 'Welcome to PLG Playoff, in the 2023-24 season, there are four teams ...' },
                publishedAt: { type: 'string', description: 'The time when the news was published', example: '2024-05-23T10:00:00.000Z' },
                photo: { type: 'file', format: 'binary', description: 'The photo file' },
            }
        }
    })
    @Post()
    async create(@UploadedFile() photo: Express.Multer.File, @Body() createNewsDto: CreateNewsDto): Promise<News> { 
        const newCreateNewsDto = {
            ...createNewsDto,
            photo: photo ? photo.path : './uploads/default.png'
        };
        return this.newsService.create(newCreateNewsDto);
    }
}
