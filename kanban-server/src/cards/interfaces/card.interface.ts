import { Document } from 'mongoose';

export interface Card extends Document {
  content: string;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;
}