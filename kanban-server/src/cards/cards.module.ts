import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardsGateway } from './cards.gateway';
import { Card, CardSchema } from './schemas/card.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])],
  controllers: [CardsController],
  providers: [CardsService, CardsGateway],
})
export class CardsModule {}