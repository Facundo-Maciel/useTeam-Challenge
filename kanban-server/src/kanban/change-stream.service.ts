// src/kanban/change-stream.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KanbanGateway } from './kanban.gateway';
import { Card, CardDocument } from './schemas/card.schema';

@Injectable()
export class ChangeStreamService implements OnModuleInit {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    private kanbanGateway: KanbanGateway,
  ) {}

  onModuleInit() {
    const stream = this.cardModel.watch();
    stream.on('change', change => {
      this.kanbanGateway.server.emit('cardChanged', change.fullDocument);
    });
  }
}