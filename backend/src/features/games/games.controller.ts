import { Controller, Get, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Game } from './games.model';

@ApiTags('Game')
@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}
    
    @ApiOperation({ summary: 'Get game data' })
    @ApiResponse({ status: 201, description: 'Return all game data' })
    @Get()
    async getAllGames(): Promise<Game[]> {
        return this.gamesService.getAllGames();
    }

    @ApiOperation({ summary: 'Get specific game data' })
    @ApiResponse({ status: 201, description: 'Return specific game data' })
    @Get('/:gameID')
    async getDataByGameID(@Param('gameID') gameID: string): Promise<Game> {
        return this.gamesService.getDataByGameID(gameID);
    }

    @ApiOperation({ summary: 'Get game data at specific day' })
    @ApiResponse({ status: 201, description: 'Return game data at specific day' })
    @Get('/date/:date')
    async getDataByDate(@Param('date') date: string): Promise<Game[]> {
        return this.gamesService.getDataByDate(date);
    }

}
