import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PlayerStatistics extends Document {
    @Prop({ required: true })
    gamesPlayed: number;
  
    @Prop({ required: true })
    timePlayed: string;
    
    @Prop({ required: true })
    twoPointersMade: number;
    
    @Prop({ required: true })
    twoPointersAttempted: number;
    
    @Prop({ required: true })
    twoPointPercentage: number;
    
    @Prop({ required: true })
    threePointersMade: number;
    
    @Prop({ required: true })
    threePointersAttempted: number;
    
    @Prop({ required: true })
    threePointPercentage: number;
  
    @Prop({ required: true })
    freeThrowsMade: number;
    
    @Prop({ required: true })
    freeThrowsAttempted: number;
    
    @Prop({ required: true })
    freeThrowPercentage: number;
    
    @Prop({ required: true })
    points: number;
    
    @Prop({ required: true })
    offensiveRebounds: number;
    
    @Prop({ required: true })
    defensiveRebounds: number;
  
    @Prop({ required: true })
    totalRebounds: number;
  
    @Prop({ required: true })
    assists: number;
  
    @Prop({ required: true })
    steals: number;
  
    @Prop({ required: true })
    blocks: number;
  
    @Prop({ required: true })
    turnovers: number;
  
    @Prop({ required: true })
    fouls: number;
}

@Schema()
export class PlayerProfile extends Document {
    @Prop({ required: true })
    playerName: string;
    
    @Prop({ required: true })
    playerName_EN: string;
    
    @Prop({ required: true })
    jerseyNumber: number;
    
    @Prop({ required: true })
    team: string;
    
    @Prop()
    nickName?: string;
    
    @Prop({ required: true })
    tenure: string;
    
    @Prop({ required: true })
    height: string;
    
    @Prop({ required: true })
    weight: string;
    
    @Prop({ required: true })
    birthDate?: string;
    
    @Prop({ required: true })
    birthPlace?: string;
    
    @Prop({ required: true })
    identity: string;
    
    @Prop()
    education?: string[];

    @Prop()
    experience?: string[];

    @Prop()
    awards?: string[];
}

@Schema()
export class Player extends Document {
  @Prop({ type: PlayerStatistics, required: true })
  statistics: PlayerStatistics;

  @Prop({ type: PlayerProfile, required: true })
  profile: PlayerProfile;
}

export const StatisticsSchema = SchemaFactory.createForClass(PlayerStatistics);
export const ProfileSchema = SchemaFactory.createForClass(PlayerProfile);
export const PlayerSchema = SchemaFactory.createForClass(Player);
