import { IsNotEmpty, IsOptional, IsNumber, IsString, IsObject, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class StatisticsPerGameDto {
    @IsNumber()
    @IsNotEmpty()
    jerseyNumber: number;

    @IsString()
    @IsNotEmpty()
    playerName: string;

    @IsString()
    @IsNotEmpty()
    timePlayed: string;

    @IsString()
    @IsNotEmpty()
    twoPointers: string;

    @IsNumber()
    @IsNotEmpty()
    twoPointPercentage: number;

    @IsString()
    @IsNotEmpty()
    threePointers: string;

    @IsNumber()
    @IsNotEmpty()
    threePointPercentage: number;

    @IsString()
    @IsNotEmpty()
    freeThrows: string;

    @IsNumber()
    @IsNotEmpty()
    freeThrowPercentage: number;

    @IsNumber()
    @IsNotEmpty()
    points: number;

    @IsNumber()
    @IsNotEmpty()
    offensiveRebounds: number;

    @IsNumber()
    @IsNotEmpty()
    defensiveRebounds: number;

    @IsNumber()
    @IsNotEmpty()
    totalRebounds: number;

    @IsNumber()
    @IsNotEmpty()
    assists: number;

    @IsNumber()
    @IsNotEmpty()
    steals: number;

    @IsNumber()
    @IsNotEmpty()
    blocks: number;

    @IsNumber()
    @IsNotEmpty()
    turnovers: number;

    @IsNumber()
    @IsNotEmpty()
    fouls: number;

    @IsNumber()
    @IsNotEmpty()
    eff: number;

    @IsNumber()
    @IsNotEmpty()
    rpm: number;

    @IsNumber()
    @IsNotEmpty()
    ts: number;

    @IsNumber()
    @IsNotEmpty()
    efg: number;
}

export class GameProfileDto { 
    @IsString()
    @IsNotEmpty()
    home: string;

    @IsString()
    @IsNotEmpty()
    home_EN: string;

    @IsString()
    @IsNotEmpty()
    homeScore: string;

    @IsString()
    @IsNotEmpty()
    away: string;

    @IsString()
    @IsNotEmpty()
    away_EN: string;

    @IsString()
    @IsNotEmpty()
    awayScore: string;

    @IsString()
    @IsNotEmpty()
    gameID: string;

    @IsString()
    @IsNotEmpty()
    stadium: string;
    
    @IsString()
    @IsNotEmpty()
    gameDate: string;

    
    @IsString()
    @IsNotEmpty()
    gameTime: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    status: string;
    
    @IsString()
    streamLink?: string;

    @IsString()
    streamLink_EN?: string;

    @IsArray()
    @IsNotEmpty()
    boxScore: string[][];
}

export class GameDto {
    @IsObject()
    @ValidateNested()
    @Type(() => GameProfileDto)
    profile: GameProfileDto;

    @IsArray()
    @ValidateNested()
    @Type(() => StatisticsPerGameDto)
    homeStatistic: StatisticsPerGameDto[];

    @IsArray()
    @ValidateNested()
    @Type(() => StatisticsPerGameDto)
    awayStatistic: StatisticsPerGameDto[];
}