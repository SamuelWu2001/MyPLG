import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './players.model';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @ApiOperation({ summary: 'Get player statistic data' })
    @ApiResponse({ status: 201, description: 'Return player statistic data' })
    @Get('statistic')
    @UseGuards(AuthGuard('jwt'))
    async getStatisticData(): Promise<Player[]> {
        return this.playersService.getStatisticData();
    }

    @ApiOperation({ summary: 'Get player profile data' })
    @ApiResponse({ status: 201, description: 'Return player profile data' })
    @Get('profile/:playerName')
    @UseGuards(AuthGuard('jwt'))
    async getProfileData(@Param('playerName') playerName: string): Promise<Player[]> {
        return this.playersService.getProfileData(playerName);
    }

    @ApiOperation({ summary: 'Get player profile data from a certain team' })
    @ApiResponse({ status: 201, description: 'Return player profile data from a certain team' })
    @Get('profile/team/:teamName')
    @UseGuards(AuthGuard('jwt'))
    async getProfileDataByTeam(@Param('teamName') teamName: string): Promise<Player[]> {
        return this.playersService.getProfileDataByTeam(teamName);
    }
}
