import { IsEmail, IsNotEmpty, IsString, isString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
