import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
   @IsString()
   @IsEmail()
   readonly email: string;

   @IsString()
   @MinLength(5)
   readonly password: string;
}
