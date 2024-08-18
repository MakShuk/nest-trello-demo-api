import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { IsDefined } from 'class-validator';

function IsDefinedIfOtherIsUndefined(property: string) {
  return function (object: any, propertyName: string) {
    ValidateIf((o) => o[property] === undefined)(object, propertyName);
    IsDefined()(object, propertyName);
  };
}

export class UpdateUserDto {
  @IsDefinedIfOtherIsUndefined('username')
  @IsEmail()
  email?: string;

  @IsDefinedIfOtherIsUndefined('email')
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username must be at most 20 characters long' })
  username?: string;
}
