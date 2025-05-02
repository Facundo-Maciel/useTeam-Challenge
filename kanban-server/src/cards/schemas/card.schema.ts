import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Card {
  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  columnId: mongoose.Schema.Types.ObjectId;
}

export const CardSchema = SchemaFactory.createForClass(Card);