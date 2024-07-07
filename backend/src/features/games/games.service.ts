import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './games.model';
import { Model } from 'mongoose';
import { GameDto } from './games.dto';


@Injectable()
export class GamesService {
    constructor(@InjectModel(Game.name) private readonly gameModel: Model<Game>) {}

    async updateGameInfo( gameDto: GameDto) {
        const filter = { 'profile.gameID': gameDto.profile.gameID };
        const options = { new: true, upsert: true };

        const existingDoc = await this.gameModel.findOne(filter);

        if (existingDoc) {
            if (existingDoc.profile.status !== '已完賽') {
                return this.gameModel.findOneAndUpdate(filter, gameDto, options).exec();
            } else {
                return existingDoc;
            }
        } else {
            return this.gameModel.create(gameDto);
        }
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

    async getDataByDate(date: string): Promise<Game[]> {
        return this.gameModel
        .find({ 'profile.gameDate': date })
        .exec();
    }
}
