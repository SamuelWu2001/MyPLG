import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './games.model';
import { Model } from 'mongoose';
import { GameDto } from './games.dto';


@Injectable()
export class GamesService {
    constructor(@InjectModel(Game.name) private readonly gameModel: Model<Game>) {}

    async updateGameInfo( gameDto: GameDto) {
        return this.gameModel.findOneAndUpdate(
            { 
                'profile.gameID': gameDto.profile.gameID, 
            }, 
            gameDto,
            { new: true, upsert: true }
        ).exec();
    }

    async getDataByGameID(gameID: string): Promise<Game> {
        return this.gameModel
        .findOne({ 'profile.gameID': gameID })
        .exec();
    }

    async getAllGames(): Promise<Game[]> {
        return this.gameModel
        .find()
        .select({'profile': 1,})
        .exec();
    }
}
