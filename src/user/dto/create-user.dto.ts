import { IsNotEmpty, IsOptional } from 'class-validator';
import { Cv } from 'src/cv/entities/cv.entity';
export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  
  cvs: Cv[];
}
