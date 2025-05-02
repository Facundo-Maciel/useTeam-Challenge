import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  columnId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);