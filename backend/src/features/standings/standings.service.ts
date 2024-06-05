import { Injectable } from '@nestjs/common';
import { Standings } from './standings.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateStandingsDto } from './standings.dto';

@Injectable()
export class StandingsService {
    constructor(@InjectModel(Standings.name) private standingsModel: Model<Standings>) {}

    async updateStandings(updateStandingsDto: UpdateStandingsDto): Promise<Standings> {
        return this.standingsModel.findOneAndUpdate(
            { team: updateStandingsDto.team },
            updateStandingsDto,
            { new: true,  upsert: true }
        ).exec();
    }


}
