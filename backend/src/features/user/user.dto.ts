import { IsNotEmpty, MaxLength, MinLength, IsNumber, IsString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'TimKao0817' })
  @MinLength(6)
  @MaxLength(16)
  userName: string;

  @ApiProperty({ example: 'afsdefdsd51' })
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @IsNotEmpty()
  photo: number;
}

export class PasswordDto {
  @IsString()
  @IsNotEmpty()
  hash: string;  

  @IsString()
  @IsNotEmpty()
  salt: string;
}

export class UserWithHashDto {
  @MinLength(6)
  @MaxLength(16)
  userName: string;

  @IsObject()
  @ValidateNested()
  @Type(() => PasswordDto )
  password: PasswordDto;

  @IsString()
  @IsNotEmpty()
  email: string;
  
  @IsNumber()
  @IsNotEmpty()
  photo: number;
}