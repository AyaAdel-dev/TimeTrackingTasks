import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name = 'Taskname';

  status = 'In progress';

  timeElapsed = 0;

  isRunning = false;
  // @IsString()
  // UserId;
}
