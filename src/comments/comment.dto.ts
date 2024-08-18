import { IsString, IsNotEmpty, IsUUID, Max, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  content: string;
}
