import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, Max, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'This is a comment',
    description: 'The content of the comment',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  content: string;
}