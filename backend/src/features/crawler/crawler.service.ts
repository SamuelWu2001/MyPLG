import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { NewsService } from '../news/news.service';
import { CreateNewsDto } from '../news/news.dto';
import { StandingsService } from '../standings/standings.service';
import { UpdateStandingsDto } from '../standings/standings.dto';
import { PlayersService } from '../players/players.service';
import { UpdatePlayerDto } from '../players/players.dto';


@Injectable()
export class CrawlerService {
    constructor(
        private readonly httpService: HttpService,
        private readonly newsService: NewsService,
        private readonly standingsService: StandingsService,
        private readonly playersService: PlayersService
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    async fetchPlayerInfo() {
        try {
            const response = await firstValueFrom(this.httpService.get(`${process.env.PLG_URL}/stat-player/2023-24`));
            const $ = cheerio.load(response.data);
            const playerData = $('table,#main-table').find('tbody');
            playerData.children().map(async (_, element)=> {
                const playerInfoData = $(element).text().trim().split('\n').map(item => item.trim()).filter(item => item);
                const playerDto = new UpdatePlayerDto();
                playerDto.playerName = playerInfoData[0];
                playerDto.jerseyNumber = playerInfoData[1];
                playerDto.team = playerInfoData[2];
                playerDto.gamesPlayed = parseFloat(playerInfoData[3]);
                playerDto.timePlayed = playerInfoData[4];
                playerDto.twoPointersMade = parseFloat(playerInfoData[5]);
                playerDto.twoPointersAttempted = parseFloat(playerInfoData[6]);
                playerDto.twoPointPercentage = parseFloat(playerInfoData[7]);
                playerDto.threePointersMade = parseFloat(playerInfoData[8]);
                playerDto.threePointersAttempted = parseFloat(playerInfoData[9]);
                playerDto.threePointPercentage = parseFloat(playerInfoData[10]);
                playerDto.freeThrowsMade = parseFloat(playerInfoData[11]);
                playerDto.freeThrowsAttempted = parseFloat(playerInfoData[12]);
                playerDto.freeThrowPercentage = parseFloat(playerInfoData[13]);
                playerDto.points = parseFloat(playerInfoData[14]);
                playerDto.offensiveRebounds = parseFloat(playerInfoData[15]);
                playerDto.defensiveRebounds = parseFloat(playerInfoData[16]);
                playerDto.totalRebounds = parseFloat(playerInfoData[17]);
                playerDto.assists = parseFloat(playerInfoData[18]);
                playerDto.steals = parseFloat(playerInfoData[19]);
                playerDto.blocks = parseFloat(playerInfoData[20]);
                playerDto.turnovers = parseFloat(playerInfoData[21]);
                playerDto.fouls = parseFloat(playerInfoData[22]);
                
                this.playersService.updatePlayerInfo(playerDto);
            })
        } catch (error) {
            console.error('Error occurred while crawling player info data:', error);
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    async fetchStandings() {
        try {
            const response = await firstValueFrom(this.httpService.get(`${process.env.PLG_URL}/standings`));
            const $ = cheerio.load(response.data);
            const rankingData = $('.team_ranking').find('tbody');
            rankingData.children().map(async (index, element) => {
                const teamRankData = $(element).text().trim().split('\n').map(item => item.trim()).filter(item => item);
                const standingsDto = new UpdateStandingsDto();
                // load data into standingsDto
                standingsDto.rank = parseInt(teamRankData[0], 10);
                standingsDto.team = teamRankData[1];
                standingsDto.gamesPlayed = parseInt(teamRankData[2], 10);
                standingsDto.win = parseInt(teamRankData[3], 10);
                standingsDto.loss = parseInt(teamRankData[4], 10);
                standingsDto.winRate = teamRankData[5];
                standingsDto.gamesBehind = parseInt(teamRankData[6], 10);
                standingsDto.winStreak = teamRankData[7];
                standingsDto.againstPilots = teamRankData[8];
                standingsDto.againstDreamers = teamRankData[9];
                standingsDto.againstKings = teamRankData[10];
                standingsDto.againstLioneers = teamRankData[11];
                standingsDto.againstBraves = teamRankData[12];
                standingsDto.againstSteelers = teamRankData[13];
                // update new standings into database
                this.standingsService.updateStandings(index.toString(), standingsDto);
            })
        } catch (error) {
            console.error('Error occurred while crawling standings data:', error);
        }
    }

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
