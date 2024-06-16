import { IsNotEmpty, IsOptional, IsNumber, IsString, IsObject, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class PlayerStatisticsDto {
    @IsNumber()
    @IsNotEmpty()
    gamesPlayed: number;

    @IsString()
    @IsNotEmpty()
    timePlayed: string;

    @IsNumber()
    @IsNotEmpty()
    twoPointersMade: number;

    @IsNumber()
    @IsNotEmpty()
    twoPointersAttempted: number;

    @IsNumber()
    @IsNotEmpty()
    twoPointPercentage: number;

    @IsNumber()
    @IsNotEmpty()
    threePointersMade: number;

    @IsNumber()
    @IsNotEmpty()
    threePointersAttempted: number;

    @IsNumber()
    @IsNotEmpty()
    threePointPercentage: number;

    @IsNumber()
    @IsNotEmpty()
    freeThrowsMade: number;

    @IsNumber()
    @IsNotEmpty()
    freeThrowsAttempted: number;

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
}
  
export class PlayerProfileDto {
    @IsString()
    @IsNotEmpty()
    playerName: string;
    
    @IsString()
    @IsNotEmpty()
    playerName_EN: string;

    @IsNumber()
    @IsNotEmpty()
    jerseyNumber: number;

    @IsString()
    @IsOptional()
    imgUrl?: string;

    @IsString()
    @IsNotEmpty()
    team: string;
    
    @IsString()
    nickName?: string;

    @IsNumber()
    @IsNotEmpty()
    tenure: string;

    @IsNumber()
    @IsNotEmpty()
    height: string;

    @IsNumber()
    @IsNotEmpty()
    weight: string;

    @IsString()
    birthDate?: string;

    @IsString()
    birthPlace?: string;

    @IsString()
    @IsNotEmpty()
    identity: string;

    @IsArray()
    education?: string[];

    @IsArray()
    experience?: string[];

    @IsArray()
    awards?: string[];

}

export class UpdatePlayerDto {
    @IsObject()
    @ValidateNested()
    @Type(() => PlayerStatisticsDto)
    statistics: PlayerStatisticsDto;

    @IsObject()
    @ValidateNested()
    @Type(() => PlayerProfileDto)
    profile: PlayerProfileDto;
}
