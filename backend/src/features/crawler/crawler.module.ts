import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsModule } from '../news/news.module';
import { TeamsModule } from '../teams/teams.module';
import { PlayersModule } from '../players/players.module';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    NewsModule,
    TeamsModule,
    PlayersModule,
    GamesModule
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService]
})
export class CrawlerModule {}
