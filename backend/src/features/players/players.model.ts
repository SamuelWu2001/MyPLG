import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Player extends Document {
    @Prop({ required: true })
    playerName: string;

    @Prop({ required: true })
    jerseyNumber: string;

    @Prop({ required: true })
    team: string;

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


export const PlayerSchema = SchemaFactory.createForClass(Player);