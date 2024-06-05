import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UpdateStandingsDto {
    @IsNumber()
    @IsNotEmpty()
    rank: number;
  
    @IsString()
    @IsNotEmpty()
    team: string;
  
    @IsNumber()
    @IsNotEmpty()
    gamesPlayed: number;
  
    @IsNumber()
    @IsNotEmpty()
    win: number;
  
    @IsNumber()
    @IsNotEmpty()
    loss: number;
  
    @IsString()
    @IsNotEmpty()
    winRate: string;
  
    @IsNumber()
    @IsNotEmpty()
    gamesBehind: number;
  
    @IsString()
    @IsNotEmpty()
    winStreak: string;

    @IsString()
    @IsNotEmpty()
    againstPilots: string;

    @IsString()
    @IsNotEmpty()
    againstDreamers: string;

    @IsString()
    @IsNotEmpty()
    againstKings: string;

    @IsString()
    @IsNotEmpty()
    againstLioneers: string;

    @IsString()
    @IsNotEmpty()
    againstBraves: string;

    @IsString()
    @IsNotEmpty()
    againstSteelers: string;
}