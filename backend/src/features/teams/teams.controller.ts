import { Controller, Get, Param } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './teams.model';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @ApiOperation({ summary: 'Get standings data' })
    @ApiResponse({ status: 201, description: 'retrun stangins data' })
    @Get('standings')
    async getStandingData(): Promise<Team[]> {
        return this.teamsService.getStandingData();
    }

    @ApiOperation({ summary: 'Get team profile data' })
    @ApiResponse({ status: 201, description: 'Return team profile data' })
    @Get('profile/:teamName')
    async getProfileData(@Param('teamName') teamName: string): Promise<Team[]> {
        return this.teamsService.getProfileData(teamName);
    }
}
