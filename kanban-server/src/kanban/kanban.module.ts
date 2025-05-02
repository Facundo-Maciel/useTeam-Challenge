import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './schemas/card.schema';
import { KanbanGateway } from './kanban.gateway';
import { ChangeStreamService } from './change-stream.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  providers: [KanbanGateway, ChangeStreamService],
})
export class KanbanModule {}