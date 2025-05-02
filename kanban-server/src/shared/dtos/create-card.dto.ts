import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  columnId: string;
}