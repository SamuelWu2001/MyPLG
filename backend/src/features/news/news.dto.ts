import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateNewsDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsOptional()
    imgUrl?: string;

    @IsString()
    @IsNotEmpty()
    publishedAt: string;
    
    @IsString()
    @IsNotEmpty()
    tag: string;
}