import { Controller, Get } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './players.model';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @ApiOperation({ summary: 'Get player info data' })
    @ApiResponse({ status: 201, description: 'Return player info' })
    @Get()
    async findAllPlayers(): Promise<Player[]> {
        return this.playersService.findAll();
    }
}
