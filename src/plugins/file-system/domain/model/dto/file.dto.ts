import { IsString, IsNumber, IsOptional } from 'class-validator';

export class FileDTO {
    
  @IsString()
  id: string;

  @IsString()
  filename: string;

  @IsString()
  mimetype: string;

  @IsNumber()
  size: number;

  @IsString()
  data: string;

  @IsOptional()
  @IsString()
  extension?: string;
}