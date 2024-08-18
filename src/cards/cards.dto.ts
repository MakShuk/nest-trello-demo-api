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
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}

export class UpdateCardDto {
  @IsDefinedIfOtherIsUndefined('description')
  @IsString()
  @MaxLength(50)
  title?: string;

  @IsDefinedIfOtherIsUndefined('title')
  @IsString()
  @MaxLength(500)
  description?: string;
}
