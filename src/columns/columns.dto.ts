import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({
    description: 'The title of the column',
    example: 'To Do',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  title: string;
}
