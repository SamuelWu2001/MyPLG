import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './features/news/news.module';
import { APP_PIPE } from '@nestjs/core';
import { MongoConfigFactory } from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { CrawlerModule } from './features/crawler/crawler.module';
import { StandingsModule } from './features/standings/standings.module';
import { PlayersModule } from './features/players/players.module';


dotenv.config({ path: 'development.env'});

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      load: [MongoConfigFactory],
      envFilePath: '../development.env',
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(config:ConfigService) => ({
        uri: config.get<string>('mongo.uri')
      })
    }),
    NewsModule,
    CrawlerModule,
    StandingsModule,
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    } 
  ],
})
export class AppModule {}
