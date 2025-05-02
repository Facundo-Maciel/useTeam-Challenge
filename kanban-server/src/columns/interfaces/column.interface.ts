import { Document } from 'mongoose';

export interface Column extends Document {
  readonly title: string;
  readonly cards: string[]; // IDs de las tarjetas
}