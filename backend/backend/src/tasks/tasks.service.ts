// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { CreateTaskDto } from './dtos/createTask.dto';
// import { UpdateTaskDto } from './dtos/updateTask.dto';
// import { Task } from './entity/task.entity';

// @Injectable()
// export class TaskService {
//   constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

//   async createTask(createTaskDto: CreateTaskDto) {
//     const task = new this.taskModel(createTaskDto);
//     return await task.save();
//   }

//   async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
//     const task = await this.taskModel.findById(id);
//     if (!task) {
//       throw new NotFoundException(`Task with ID ${id} not found`);
//     }
//     task.name = updateTaskDto.name || task.name;
//     task.status = updateTaskDto.status || task.status;
//     task.timeElapsed = updateTaskDto.timeElapsed || task.timeElapsed;
//     task.isRunning =
//       updateTaskDto.isRunning === undefined
//         ? task.isRunning
//         : updateTaskDto.isRunning;
//     return await task.save();
//   }

//   async getTasks(searchTerm: string) {
//     const query = searchTerm
//       ? { name: { $regex: searchTerm, $options: 'i' } }
//       : {};
//     return await this.taskModel.find(query).exec();
//   }

//   async getAllTasks() {
//     // const query = searchTerm
//     //   ? { name: { $regex: searchTerm, $options: 'i' } }
//     //   : {};
//     return await this.taskModel.find().exec();
//   }

//   async deleteTask(id: string) {
//     const task = await this.taskModel.findByIdAndDelete(id);
//     if (!task) {
//       throw new NotFoundException(`Task with ID ${id} not found`);
//     }
//     return task;
//   }
// }
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dtos/createTask.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import { Task, TaskDocument } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(userId: string, createTaskDto: CreateTaskDto) {
    const task = new this.taskModel({
      ...createTaskDto,
      userId,
    });
    return await task.save();
  }

  async updateTask(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.taskModel.findOne({
      _id: taskId,
      // userId,
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (task.userId !== userId) throw new UnauthorizedException();
    task.name = updateTaskDto.name || task.name;
    task.status = updateTaskDto.status || task.status;
    task.timeElapsed = updateTaskDto.timeElapsed || task.timeElapsed;
    task.isRunning =
      updateTaskDto.isRunning === undefined
        ? task.isRunning
        : updateTaskDto.isRunning;
    return await task.save();
  }

  async getTasks(searchTerm: string) {
    const query = searchTerm
      ? { name: { $regex: searchTerm, $options: 'i' } }
      : {};
    return await this.taskModel.find(query).exec();
  }

  async getMyTasks(userId: string) {
    return await this.taskModel.find({ userId }).exec();
  }

  async deleteTask(userId: string, id: string) {
    const taskCheck = await this.taskModel.find({ userId, id });
    if (taskCheck.length <= 0) throw new UnauthorizedException();
    const task = await this.taskModel.findByIdAndDelete(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }
}
