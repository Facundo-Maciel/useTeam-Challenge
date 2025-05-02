import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { Column } from './interfaces/column.interface';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  async create(@Body('title') title: string): Promise<Column> {
    return this.columnsService.create(title);
  }

  @Get()
  async findAll(): Promise<Column[]> {
    return this.columnsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Column> {
    return this.columnsService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body('title') title: string): Promise<Column> {
    return this.columnsService.update(id, title);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Column> {
    return this.columnsService.delete(id);
  }
}
