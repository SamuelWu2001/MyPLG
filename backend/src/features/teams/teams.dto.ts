import { IsNotEmpty, IsNumber, IsString, IsObject, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class StandingsDto {
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

export class TeamIntroductionDto {
    @IsString()
    @IsNotEmpty()
    coreValues: string;

    @IsString()
    @IsNotEmpty()
    brandStory: string;

    @IsString()
    @IsNotEmpty()
    officialName: string;
    
    @IsString()
    @IsNotEmpty()
    establishmentDate: string;
}

export class FacilityDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;
}

export class PurchaseDto {
    @IsString()
    @IsNotEmpty()
    instruction: string;

    @IsString()
    @IsNotEmpty()
    link: string;
}

export class TeamProfileDto {    
    @IsString()
    @IsNotEmpty()
    team: string;
    
    @IsObject()
    @ValidateNested()
    @Type(() => TeamIntroductionDto )
    introduction: TeamIntroductionDto;

    @IsObject()
    @ValidateNested()
    @Type(() => PurchaseDto )
    purchase: PurchaseDto;
   
    @IsObject()
    @ValidateNested()
    @Type(() => FacilityDto )
    facility: FacilityDto;

    @IsArray()
    @IsNotEmpty()
    playerList: string[];
}

export class TeamDto {
    @IsObject()
    @ValidateNested()
    @Type(() => StandingsDto)
    standings: StandingsDto;

    @IsObject()
    @ValidateNested()
    @Type(() => TeamProfileDto)
    profile: TeamProfileDto;
}
