import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entity/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async findOne(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
  async register(email: string, password: string): Promise<User | null> {
    const isEmailFound = await this.userModel.findOne({ email });
    if (isEmailFound) throw new BadRequestException('email already found');
    // hashing password
    const saltRounds = 10;
    const salt = bycrypt.genSaltSync(saltRounds);
    const hashedPassword = bycrypt.hashSync(
      password,
      '$2a$' + saltRounds + '$' + salt,
    );
    return await this.userModel.create({ email, password: hashedPassword });
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.password };
    const userData = await this.userModel.findOne({ email: user.email });
    console.log({ userData });
    const accessToken = await this.jwtService.sign({
      ...payload,
      userId: userData._id,
    });
    console.log(user);
    return { accessToken: accessToken, user: userData };
  }
}
