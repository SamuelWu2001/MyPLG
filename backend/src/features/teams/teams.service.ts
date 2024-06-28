import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './teams.model';
import { Model } from 'mongoose';
import { TeamDto } from './teams.dto';

@Injectable()
export class TeamsService {
    constructor(@InjectModel(Team.name) private readonly teamModel: Model<Team>) {}

    async updateTeamInfo( teamDto: TeamDto) {
        return this.teamModel.findOneAndUpdate(
            {
                'profile.team': teamDto.profile.team, 
            }, 
            teamDto,
            { new: true, upsert: true }
        ).exec();
    }

    async getStandingData(): Promise<Team[]> {
        return this.teamModel.find().select({
            'profile.team': 1,
            'standing': 1,
        }).exec();
    }

    async getProfileData(teamName: string): Promise<Team[]> {
        return this.teamModel
        .find({ 'profile.team': teamName })
        .select({'profile': 1,})
        .exec();
    }
}
