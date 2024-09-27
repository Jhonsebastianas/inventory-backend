import { IsString, IsNumber } from 'class-validator';

export class SaleProductDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
