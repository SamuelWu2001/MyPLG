import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePlayerDto {
    @IsString()
    @IsNotEmpty()
    playerName: string;

    @IsString()
    @IsNotEmpty()
    jerseyNumber: string;

    @IsString()
    @IsNotEmpty()
    team: string;

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
