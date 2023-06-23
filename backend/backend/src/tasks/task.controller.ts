// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
//   Query,
// } from '@nestjs/common';
// import { CreateTaskDto } from './dtos/createTask.dto';
// import { UpdateTaskDto } from './dtos/updateTask.dto';
// import { Task } from './entity/task.entity';
// import { TaskService } from './tasks.service';

// @Controller('tasks')
// export class TasksController {
//   constructor(private readonly taskService: TaskService) {}

//   @Post()
//   async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
//     return await this.taskService.createTask(createTaskDto);
//   }

//   @Put(':id')
//   async updateTask(
//     @Param('id') id: string,
//     @Body() updateTaskDto: UpdateTaskDto,
//   ): Promise<Task> {
//     return await this.taskService.updateTask(id, updateTaskDto);
//   }

//   @Get()
//   async getTasks(@Query('searchTerm') searchTerm: string): Promise<Task[]> {
//     return await this.taskService.getTasks(searchTerm);
//   }

//   @Get('all')
//   async getMyTasks() {
//     return await this.taskService.getAllTasks();
//   }

//   @Delete(':id')
//   async deleteTask(@Param('id') id: string): Promise<Task> {
//     return await this.taskService.deleteTask(id);
//   }
// }
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/Token/jwtAuthGard.token';
import { CreateTaskDto } from './dtos/createTask.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import { Task } from './entity/task.entity';
import { TaskService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  // @Post(':userId')
  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    // @Param('userId') userId: string,
    @Req() request: Request,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = request.userId;
    return await this.taskService.createTask(userId, createTaskDto);
  }

  // @Put(':userId/:taskId')
  @Put(':taskId')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    // @Param('userId') userId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() request: Request,
  ): Promise<Task> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = request.userId;
    return await this.taskService.updateTask(userId, taskId, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@Query('searchTerm') searchTerm: string): Promise<Task[]> {
    return await this.taskService.getTasks(searchTerm);
  }

  // @Get(':userId')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyTasks(@Req() request: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = request.userId;
    return await this.taskService.getMyTasks(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<Task> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = request.userId;
    return await this.taskService.deleteTask(userId, id);
  }
}
