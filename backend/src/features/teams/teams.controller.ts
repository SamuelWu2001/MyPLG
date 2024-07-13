import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './teams.model';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @ApiOperation({ summary: 'Get standings data' })
    @ApiResponse({ status: 201, description: 'retrun stangins data' })
    @ApiBearerAuth('JWT-auth')
    @Get('standings')
    @UseGuards(AuthGuard('jwt'))
    async getStandingData(): Promise<Team[]> {
        return this.teamsService.getStandingData();
    }

    @ApiOperation({ summary: 'Get team profile data' })
    @ApiResponse({ status: 201, description: 'Return team profile data' })
    @ApiBearerAuth('JWT-auth')
    @Get('profile/:teamName')
    @UseGuards(AuthGuard('jwt'))
    async getProfileData(@Param('teamName') teamName: string): Promise<Team[]> {
        return this.teamsService.getProfileData(teamName);
    }
}
