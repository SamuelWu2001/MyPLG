import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StatisticsPerGame extends Document {
    @Prop({ required: true })
    jerseyNumber: number;

    @Prop({ required: true })
    playerName: string;
  
    @Prop({ required: true })
    timePlayed: string;
    
    @Prop({ required: true })
    twoPointers: string;
    
    @Prop({ required: true })
    twoPointPercentage: number;
    
    @Prop({ required: true })
    threePointers: string;
    
    @Prop({ required: true })
    threePointPercentage: number;
  
    @Prop({ required: true })
    freeThrows: string;
    
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

    @Prop({ required: true })
    eff: number;
  
    @Prop({ required: true })
    rpm: number;
  
    @Prop({ required: true })
    ts: number;
  
    @Prop({ required: true })
    efg: number;
}

@Schema()
export class GameProfile extends Document {
    @Prop({ required: true })
    home: string;

    @Prop({ required: true })
    home_EN: string;

    @Prop({ required: true })
    homeScore: string;

    @Prop({ required: true })
    away: string;

    @Prop({ required: true })
    away_EN: string;

    @Prop({ required: true })
    awayScore: string;

    @Prop({ required: true })
    gameID: string;

    @Prop({ required: true })
    stadium: string;

    @Prop({ required: true })
    gameDate: string;

    @Prop({ required: true })
    gameTime: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    boxScore: string[][];
}

export const GameProfileSchema = SchemaFactory.createForClass(GameProfile);

@Schema()
export class Game extends Document {
    @Prop({ type: GameProfileSchema, required: true })
    profile: GameProfile;
   
    @Prop({ type: [StatisticsPerGame] })
    homeStatistic: StatisticsPerGame[];
  
    @Prop({ type: [StatisticsPerGame] })
    awayStatistic: StatisticsPerGame[];
}

export const StatisticsPerGameSchema = SchemaFactory.createForClass(StatisticsPerGame);
export const GameSchema = SchemaFactory.createForClass(Game);
