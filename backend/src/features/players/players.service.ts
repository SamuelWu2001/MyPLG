import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './players.model';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './players.dto';

@Injectable()
export class PlayersService {
    constructor(@InjectModel(Player.name) private readonly playersModel: Model<Player>) {}
    
    async updatePlayerInfo( updatePlayerDto: UpdatePlayerDto) {
        return this.playersModel.findOneAndUpdate(
            { playerName: updatePlayerDto.playerName, team: updatePlayerDto.team, jerseyNumber: updatePlayerDto.jerseyNumber }, 
            updatePlayerDto,
            { new: true, upsert: true }
        ).exec();
    }
}
