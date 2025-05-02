import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from '../shared/dtos/create-card.dto'; //create card
import { UpdateCardDto } from '../shared/dtos/update-card.dto'; //update card

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  findAll(@Query('columnId') columnId: string) {
    return this.cardsService.findAll(columnId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Patch(':id/move')
  moveCard(@Param('id') id: string, @Body('columnId') columnId: string) {
    return this.cardsService.move(id, columnId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}

