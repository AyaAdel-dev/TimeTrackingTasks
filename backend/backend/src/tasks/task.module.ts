import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from '../tasks/task.controller';
import { TaskService } from '../tasks/tasks.service';
import { Task, TaskSchema } from './entity/task.entity';
import { User, UserSchema } from 'src/auth/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TaskService, JwtService],
})
export class TaskModule {}
