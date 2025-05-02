import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from './interfaces/card.interface';
import { CreateCardDto } from '../shared/dtos/create-card.dto'; //create-card.dt
import { UpdateCardDto } from '../shared/dtos/update-card.dto';
import { CardsGateway } from './cards.gateway';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel('Card') private cardModel: Model<Card>,
    private readonly cardsGateway: CardsGateway,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const createdCard = new this.cardModel(createCardDto);
    const savedCard = await createdCard.save();
    this.cardsGateway.server.emit('cardCreated', savedCard);
    return savedCard;
  }

  async findAll(columnId?: string): Promise<Card[]> {
    if (columnId) {
      return this.cardModel.find({ columnId }).exec();
    }
    return this.cardModel.find().exec();
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id).exec();
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    const updatedCard = await this.cardModel
      .findByIdAndUpdate(id, updateCardDto, { new: true })
      .exec();
    if (!updatedCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    this.cardsGateway.server.emit('cardUpdated', updatedCard);
    return updatedCard;
  }

  async move(id: string, columnId: string): Promise<Card> {
    const movedCard = await this.cardModel
      .findByIdAndUpdate(id, { columnId }, { new: true })
      .exec();
    if (!movedCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    this.cardsGateway.server.emit('cardMoved', movedCard);
    return movedCard;
  }

  async remove(id: string): Promise<void> {
    const deletedCard = await this.cardModel.findByIdAndDelete(id).exec();
    if (!deletedCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    this.cardsGateway.server.emit('cardDeleted', id);
  }
}