import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ _id: false })
export class Standings extends Document {
    @Prop()
    _id: string;

    @Prop({ required: true })
    rank: number;
  
    @Prop({ required: true })
    team: string;
  
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

export const StandingsSchema = SchemaFactory.createForClass(Standings);