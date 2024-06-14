import { Controller, Get } from '@nestjs/common';
import { StandingsService } from './standings.service';
import { Standings } from './standings.model';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('standings')
@Controller('standings')
export class StandingsController {
    constructor(private readonly standingsService: StandingsService) {}

    @ApiOperation({ summary: 'Get standings data' })
    @ApiResponse({ status: 201, description: 'Return current standings' })
    @Get()
    async getStandings(): Promise<Standings[]> {
        return this.standingsService.findAll();
    }
}
