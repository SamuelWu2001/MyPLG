import { Injectable } from '@nestjs/common';
import { Standings } from './standings.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateStandingsDto } from './standings.dto';

@Injectable()
export class StandingsService {
    constructor(@InjectModel(Standings.name) private standingsModel: Model<Standings>) {}

    async updateStandings(index: string, updateStandingsDto: UpdateStandingsDto): Promise<Standings> {
        return this.standingsModel.findByIdAndUpdate(
            index,
            { _id: index, ...updateStandingsDto},
            { new: true,  upsert: true }
        ).exec();
    }


}
