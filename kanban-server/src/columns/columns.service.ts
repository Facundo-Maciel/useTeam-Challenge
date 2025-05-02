import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column } from './interfaces/column.interface';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class ColumnsService {
  constructor(@InjectModel('Column') private readonly columnModel: Model<Column>) {}

  async create(title: string): Promise<Column> {
    const newColumn = new this.columnModel({ title, cards: [] });
    return await newColumn.save();
  }

  async findAll(): Promise<Column[]> {
    return await this.columnModel.find().populate('cards').exec();
  }

  async findById(id: string): Promise<Column> {
    const column = await this.columnModel.findById(id).exec();
    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }
    return column;
  }
  
  async update(id: string, title: string): Promise<Column> {
    const updated = await this.columnModel.findByIdAndUpdate(id, { title }, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }
    return updated;
  }
  
  async delete(id: string): Promise<Column> {
    const deleted = await this.columnModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }
    return deleted;
  }

}