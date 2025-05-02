import { IsString, IsOptional } from 'class-validator';

export class UpdateCardDto {
  @IsString()
  @IsOptional()
  content?: string;
}