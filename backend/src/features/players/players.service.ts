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
            { 
                'profile.playerName': updatePlayerDto.profile.playerName, 
                'profile.team': updatePlayerDto.profile.team, 
                'profile.jerseyNumber': updatePlayerDto.profile.jerseyNumber
            }, 
            updatePlayerDto,
            { new: true, upsert: true }
        ).exec();
    }

    async getStatisticData(): Promise<Player[]> {
        return this.playersModel.find().select({
            'profile.playerName': 1,
            'profile.jerseyNumber': 1,
            'profile.team': 1,
            'statistics': 1,
        }).exec();
    }

    async getProfileData(playerName: string): Promise<Player[]> {
        return this.playersModel
        .find({ 'profile.playerName': playerName })
        .select({'profile': 1,})
        .exec();
    }
}
