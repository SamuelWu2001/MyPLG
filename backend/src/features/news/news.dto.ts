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
    photo?: string;

    @IsString()
    @IsNotEmpty()
    publishedAt: string;
}