import { IsString, IsNumber, IsOptional } from 'class-validator';

export class FileDTO {
    
  id: string;

  @IsString()
  filename: string;

  @IsString()
  mimetype: string;

  @IsNumber()
  size: number;

  @IsString()
  data: string;

  @IsString()
  extension?: string;
}