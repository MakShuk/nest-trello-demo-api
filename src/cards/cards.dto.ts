import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  ValidateIf,
  IsDefined,
} from 'class-validator';

function IsDefinedIfOtherIsUndefined(property: string) {
  return function (object: any, propertyName: string) {
    ValidateIf((o) => o[property] === undefined)(object, propertyName);
    IsDefined()(object, propertyName);
  };
}

export class CreateCardDto {
  @ApiProperty({
    example: 'My Card',
    description: 'Name of the card',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @ApiPropertyOptional({
    example: 'This is a description',
    description: 'Description of the card',
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}

export class UpdateCardDto {
  @ApiPropertyOptional({
    example: 'My Card',
    description: 'Name of the card',
    maxLength: 50,
  })
  @IsDefinedIfOtherIsUndefined('description')
  @IsString()
  @MaxLength(50)
  title?: string;

  @ApiPropertyOptional({
    example: 'This is a description',
    description: 'Description of the card',
    maxLength: 500,
  })
  @IsDefinedIfOtherIsUndefined('title')
  @IsString()
  @MaxLength(500)
  description?: string;
}
