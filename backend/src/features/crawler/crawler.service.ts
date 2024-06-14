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
import { UpdatePlayerDto, PlayerProfileDto, PlayerStatisticsDto } from '../players/players.dto';


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
                const profileURL = $(element).find('a').attr('href')
                const profileResponse = await firstValueFrom(this.httpService.get(`${process.env.PLG_URL}${profileURL}`));
                const profile = cheerio.load(profileResponse.data);
                const playerProfileData = profile('#section_player');
                const playerProfile = playerProfileData.find('.mt-md-3').text().trim().split('\n')
                    .map(item => item.trim())
                    .filter(item => item)
                    .map(item => {
                      const parts = item.split('：');
                      return parts.length === 2 ? parts[1].trim() : ''; 
                    });

                const education: string[] = [];
                const experience: string[] = [];
                let status = 0;
                playerProfileData.find('.py-0').text().trim().split('\n').map(item => item.trim())
                .filter(item => item).forEach(item => {
                    if (item === '學歷') {
                        status = 1;
                    } else if (item === '經歷') {
                        status = 2;
                    } else if (status === 1) {
                        education.push(item);
                    } else if (status === 2) {
                        experience.push(item);
                    }
                })
                const playerDto = new UpdatePlayerDto();
                playerDto.profile = new PlayerProfileDto();
                playerDto.statistics = new PlayerStatisticsDto()
                
                // profile data
                playerDto.profile.playerName = playerInfoData[0];
                playerDto.profile.playerName_EN = playerProfileData.find('.worker_black.fs20').text();
                playerDto.profile.jerseyNumber = parseFloat(playerInfoData[1]);
                playerDto.profile.team = playerInfoData[2];
                playerDto.profile.nickName = playerProfile[0];
                playerDto.profile.tenure = playerProfile[1];
                playerDto.profile.height = playerProfile[2];
                playerDto.profile.weight = playerProfile[3];
                playerDto.profile.birthDate = playerProfile[4];
                playerDto.profile.birthPlace = playerProfile[5];
                playerDto.profile.identity = playerProfile[6];
                playerDto.profile.education = education;
                playerDto.profile.experience = experience;
                playerDto.profile.awards = playerProfileData.find('.pl-3.py-3').text().trim().split('\n').map(item => item.trim()).filter(item => item);
                
                // statistics data
                playerDto.statistics.gamesPlayed = parseFloat(playerInfoData[3]);
                playerDto.statistics.timePlayed = playerInfoData[4];
                playerDto.statistics.twoPointersMade = parseFloat(playerInfoData[5]);
                playerDto.statistics.twoPointersAttempted = parseFloat(playerInfoData[6]);
                playerDto.statistics.twoPointPercentage = parseFloat(playerInfoData[7]);
                playerDto.statistics.threePointersMade = parseFloat(playerInfoData[8]);
                playerDto.statistics.threePointersAttempted = parseFloat(playerInfoData[9]);
                playerDto.statistics.threePointPercentage = parseFloat(playerInfoData[10]);
                playerDto.statistics.freeThrowsMade = parseFloat(playerInfoData[11]);
                playerDto.statistics.freeThrowsAttempted = parseFloat(playerInfoData[12]);
                playerDto.statistics.freeThrowPercentage = parseFloat(playerInfoData[13]);
                playerDto.statistics.points = parseFloat(playerInfoData[14]);
                playerDto.statistics.offensiveRebounds = parseFloat(playerInfoData[15]);
                playerDto.statistics.defensiveRebounds = parseFloat(playerInfoData[16]);
                playerDto.statistics.totalRebounds = parseFloat(playerInfoData[17]);
                playerDto.statistics.assists = parseFloat(playerInfoData[18]);
                playerDto.statistics.steals = parseFloat(playerInfoData[19]);
                playerDto.statistics.blocks = parseFloat(playerInfoData[20]);
                playerDto.statistics.turnovers = parseFloat(playerInfoData[21]);
                playerDto.statistics.fouls = parseFloat(playerInfoData[22]);

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
                const teamRankData = $(element).text().trim().split(/\n|(?=P)/).map(item => item.trim()).filter(item => item);
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
                this.standingsService.updateStandings(standingsDto);
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
