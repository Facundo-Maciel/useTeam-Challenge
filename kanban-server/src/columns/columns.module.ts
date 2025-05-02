import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { ColumnsGateway } from './columns.gateway';
import { ColumnSchema } from './schemas/column.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Column', schema: ColumnSchema }])],
  controllers: [ColumnsController],
  providers: [ColumnsService, ColumnsGateway],
})
export class ColumnsModule {}