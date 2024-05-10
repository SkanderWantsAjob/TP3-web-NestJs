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
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
  @IsString()
  role: string;
}


