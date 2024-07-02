import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Standings extends Document {
    @Prop({ required: true })
    rank: number;
  
    @Prop({ required: true })
    gamesPlayed: number;
  
    @Prop({ required: true })
    win: number;
  
    @Prop({ required: true })
    loss: number;
  
    @Prop({ required: true })
    winRate: string;
  
    @Prop({ required: true })
    gamesBehind: number;
  
    @Prop({ required: true })
    winStreak: string;

    @Prop({ required: true })
    againstPilots: string;

    @Prop({ required: true })
    againstDreamers: string;

    @Prop({ required: true })
    againstKings: string;

    @Prop({ required: true })
    againstLioneers: string;

    @Prop({ required: true })
    againstBraves: string;

    @Prop({ required: true })
    againstSteelers: string;
}

@Schema()
export class Introduction extends Document {
    @Prop({ required: true})
    coreValues: string;

    @Prop({ required: true })
    brandStory: string;

    @Prop({ required: true })
    officialName: string;
    
    @Prop({ required: true })
    establishmentDate: string;
}

@Schema()
export class Purchase extends Document {
    @Prop({ required: true})
    instruction: string;

    @Prop({ required: true })
    link: string;
}

@Schema()
export class Facility extends Document { 
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: string;
    
    @Prop({ required: true })
    contact: string;
}

@Schema()
export class TeamProfile extends Document {
    @Prop({ required: true })
    team: string;

    @Prop({ type: Introduction, required: true })
    introduction: Introduction;

    @Prop({ type: Purchase, required: true })
    purchase: Purchase;

    @Prop({ type: Facility, required: true })
    facility: Facility;

    @Prop({ required: true })
    playerList: string[];
    
}


@Schema()
export class Team extends Document {
  @Prop({ type: Standings, required: true })
  standings: Standings;

  @Prop({ type: TeamProfile, required: true })
  profile: TeamProfile;
}

// export const StandingSchema = SchemaFactory.createForClass(Standings);
// export const ProfileSchema = SchemaFactory.createForClass(TeamProfile);
export const TeamSchema = SchemaFactory.createForClass(Team);