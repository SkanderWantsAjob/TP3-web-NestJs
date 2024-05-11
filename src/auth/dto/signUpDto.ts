import {
  IsString,
  MinLength,
  IsEmail,
  MaxLength,
  Matches,
  IsIn,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SignUpDto {
  @Type((convertiVers) => Number)
  @IsNumber()
  @IsNotEmpty()
  id:number;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  role: string;
}


