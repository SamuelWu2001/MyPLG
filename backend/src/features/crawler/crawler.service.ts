import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { NewsService } from '../news/news.service';
import { CreateNewsDto } from '../news/news.dto';
import { TeamsService } from '../teams/teams.service';
import { GamesService } from '../games/games.service';
import { TeamDto, StandingsDto, TeamProfileDto, TeamIntroductionDto, PurchaseDto, FacilityDto } from '../teams/teams.dto';
import { PlayersService } from '../players/players.service';
import { UpdatePlayerDto, PlayerProfileDto, PlayerStatisticsDto } from '../players/players.dto';
import { GameDto, StatisticsPerGameDto, GameProfileDto } from '../games/games.dto';


@Injectable()
export class CrawlerService {
    constructor(
        private readonly httpService: HttpService,
        private readonly newsService: NewsService,
        private readonly teamsService: TeamsService,
        private readonly playersService: PlayersService,
        private readonly gamesService: GamesService,
    ) {}
    
    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    async fetchGameInfo() {
        await this.getGameInfo('例行賽', 'schedule-regular-season'); 
        await this.getGameInfo('季後賽', 'schedule-playoffs'); 
        await this.getGameInfo('總冠軍賽', 'schedule-finals'); 
    }

    async getGameInfo(gameType: string, url: string) {
        try {
            const response = await firstValueFrom(this.httpService.get(`${process.env.PLG_URL}/${url}/2023-24`));
            const $ = cheerio.load(response.data);
            const gameData = $('.match_row');
            gameData.children().map(async(_, element) => {
                const statisticURL = $(element).find('.d-md-block').attr('href');
                const statisticResponse = await firstValueFrom(this.httpService.get(`${process.env.PLG_URL}${statisticURL}`));
                const statisticData = cheerio.load(statisticResponse.data);

                const gameInfoData = $(element).text().trim().split('\n').map(item => item.trim()).filter(item => item);
                const boxScoreData = statisticData('.match_table').children().eq(0).text().trim().split('\n').map(item => item.trim()).filter(item => item);
                const additionalData = statisticData('.match_table').children().eq(1).text().trim().split('\n').map(item => item.trim()).filter(item => item)
                boxScoreData.push(...additionalData);

                const gameDto = new GameDto();
                gameDto.profile = new GameProfileDto();
                // profile
                gameDto.profile.gameDate = gameInfoData[0] + ' ' + gameInfoData[1];
                gameDto.profile.gameTime = gameInfoData[2];
                gameDto.profile.away = gameInfoData[4].slice(gameInfoData[4].length/2);
                gameDto.profile.away_EN = gameInfoData[5];
                gameDto.profile.awayScore = gameInfoData[6].slice(gameInfoData[6].length/2);
                gameDto.profile.gameID = gameInfoData[7];
                gameDto.profile.stadium = gameInfoData[8];
                gameDto.profile.homeScore = gameInfoData[11].slice(gameInfoData[11].length/2);
                gameDto.profile.home = gameInfoData[13].slice(gameInfoData[13].length/2);
                gameDto.profile.home_EN = gameInfoData[14];
                gameDto.profile.type = gameType;
                gameDto.profile.status = boxScoreData[0];
                gameDto.profile.boxScore = [
                    [boxScoreData[1], boxScoreData[3]], 
                    [boxScoreData[4], boxScoreData[6]], 
                    [boxScoreData[7], boxScoreData[9]], 
                    [boxScoreData[10], boxScoreData[12]], 
                    [boxScoreData[13], boxScoreData[15]]
                ];
                // awayStatistic
                gameDto.awayStatistic = [];
                // homeStatistic
                gameDto.homeStatistic = [];
                this.gamesService.updateGameInfo(gameDto);
            })
        } catch (error) {
            console.error('Error occurred while crawling game info data:', error);
        }
    }

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
                
                // download image               
                const imgUrl = `./uploads/players/${playerInfoData[0]}.jpg`
                if (!fs.existsSync(imgUrl)) {
                    try {
                        const url = playerProfileData.find('.player_image').attr('style').match(/url\(['"]?([^'"]+)['"]?\)/);
                        const playerImgUrl = `https:${url[1]}`;
                        const playerImgResponse = await firstValueFrom(this.httpService.get(playerImgUrl, { responseType: 'stream', timeout: 10000 })); 
                        const writer = fs.createWriteStream(imgUrl);
                        playerImgResponse.data.pipe(writer);
                    } catch (error) {
                        console.log('Error', playerInfoData[0], error)
                    }
                }
                playerDto.profile.imgUrl = `/uploads/players/${playerInfoData[0]}.jpg`;

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
    async fetchTeamInfo() {
        const teamCode: { [key: string]: number } = {
            '勇士': 1,
            '領航猿': 2,
            '攻城獅': 3,
            '夢想家': 4,
            '鋼鐵人': 5,
            '國王': 6,
        };
        
        try {
            const response = await firstValueFrom(this.httpService.get(`${process.env.PLG_URL}/standings`));
            const $ = cheerio.load(response.data);
            const rankingData = $('.team_ranking').find('tbody');
            rankingData.children().map(async (_, element) => {
                const teamRankData = $(element).text().trim().split(/\n|(?=P)/).map(item => item.trim()).filter(item => item);
                const teamDto = new TeamDto();
                teamDto.profile = new TeamProfileDto();
                teamDto.standings = new StandingsDto();
                teamDto.profile.introduction = new TeamIntroductionDto();
                teamDto.profile.purchase = new PurchaseDto();
                teamDto.profile.facility = new FacilityDto();
                // load data into standingsDto
                teamDto.standings.rank = parseInt(teamRankData[0], 10);
                teamDto.standings.gamesPlayed = parseInt(teamRankData[2], 10);
                teamDto.standings.win = parseInt(teamRankData[3], 10);
                teamDto.standings.loss = parseInt(teamRankData[4], 10);
                teamDto.standings.winRate = teamRankData[5];
                teamDto.standings.gamesBehind = parseInt(teamRankData[6], 10);
                teamDto.standings.winStreak = teamRankData[7];
                teamDto.standings.againstPilots = teamRankData[8];
                teamDto.standings.againstDreamers = teamRankData[9];
                teamDto.standings.againstKings = teamRankData[10];
                teamDto.standings.againstLioneers = teamRankData[11];
                teamDto.standings.againstBraves = teamRankData[12];
                teamDto.standings.againstSteelers = teamRankData[13];
                // update new standings into database
                teamDto.profile.team = teamRankData[1];
                teamDto.profile.introduction.coreValues = '';
                teamDto.profile.introduction.brandStory = '';
                teamDto.profile.introduction.officialName = '';
                teamDto.profile.introduction.establishmentDate = '';
                const profileResponse = await firstValueFrom(this.httpService.get(`${process.env.PLG_URL}/team/${teamCode[teamDto.profile.team]}`));
                const profile = cheerio.load(profileResponse.data);
                let status = 0;
                profile('.team_intro').text().trim().split('\n').map(item => item.trim())
                .filter(item => item).forEach(item => {
                    if (item === '核心理念') {
                        status = 1;
                    } else if (item === '品牌故事') {
                        status = 2;
                    } else if (item === '正式名稱') {
                        status = 3;
                    } else if (item === '成立時間') {
                        status = 4;
                    } else if (status === 1) {
                        teamDto.profile.introduction.coreValues += (item + '\n');
                    } else if (status === 2) {
                        teamDto.profile.introduction.brandStory += (item + '\n');
                    } else if (status === 3) {
                        teamDto.profile.introduction.officialName += (item + '\n');
                    } else if (status === 4) {
                        teamDto.profile.introduction.establishmentDate += (item + '\n');
                        status = 5;
                    }
                }) 
                teamDto.profile.purchase.instruction = profile('.fs14.text-black:eq(3)').text().trim();
                teamDto.profile.purchase.link = profile('#goto_buy_ticket').attr('href');
                teamDto.profile.facility.name = profile('.text-black.fs16:eq(3)').text().trim();
                teamDto.profile.facility.address = profile('.gym_detail:eq(0)').text();
                teamDto.profile.facility.contact = profile('.gym_detail:eq(1)').text();
                teamDto.profile.playerList = [];
                profile('.player_list').find('.fs16.text_strong').contents().filter((_, el) => el.type === 'text').map((_, el) => {
                    teamDto.profile.playerList.push(profile(el).text().split(' ')[0]);
                })
                this.teamsService.updateTeamInfo(teamDto);
            })
        } catch (error) {
            console.error('Error occurred while crawling teams data:', error);
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
