import { IsArray, IsInt, IsNumber, IsNotEmpty, ArrayMinSize, ArrayMaxSize, IsIn } from 'class-validator';

export class GenerateCombinationDto {
  @IsNumber({}, { message: 'Length must be a number' })
  @IsNotEmpty({ message: 'Length is required' })
  length: number;

  @IsArray({ message: 'Items must be an array' })
  @ArrayMinSize(1, { message: 'Items array must have at least 1 item' })
  @ArrayMaxSize(26, { message: 'Items array can have a maximum of 26 items' })
  @IsInt({ each: true, message: 'Each item must be an integer' })
  @IsIn(Array.from({ length: 26 }, (_, i) => i + 1), { each: true, message: 'Items must be numbers from 1 to 26' })
  items: number[];
}