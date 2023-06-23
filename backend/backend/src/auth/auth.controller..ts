import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerivce: AuthService) {}

  @Post('/register')
  async register(@Body() body: CreateTaskDto) {
    return await this.authSerivce.register(body.email, body.password);
  }

  @Post('/login')
  async login(@Body() body: User) {
    return await this.authSerivce.login(body);
  }
}
