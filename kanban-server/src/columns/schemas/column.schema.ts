import { Schema } from 'mongoose';

export const ColumnSchema = new Schema({
  title: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});