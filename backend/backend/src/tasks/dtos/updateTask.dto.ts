import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name: string;
  isRunning: any;
  timeElapsed: any;
  status: any;
}
