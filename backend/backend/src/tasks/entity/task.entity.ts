import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../auth/entity/user.entity';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 'In progress' })
  status: string;

  @Prop({ default: 0 })
  timeElapsed: number;

  @Prop({ default: false })
  isRunning: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
