import {
  IsString,
  IsNotEmpty,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  title: string;
}
