import { IsString, IsNumber, IsArray, IsOptional, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { SalePaymentMethodDTO } from './sale-payment-method.dto';
import { FileDTO } from 'src/plugins/file-system/domain/model/dto/file.dto';
import { SaleProductDTO } from './sale-product.dto';

export class CreateSaleDTO {
  @IsString()
  idUser: string;

  @IsOptional()
  @IsString()
  invoiceIdentifier?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleProductDTO)
  products: SaleProductDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalePaymentMethodDTO)
  paymentMethods: SalePaymentMethodDTO[];

  @IsNumber()
  totalInvoiced: number;

  @IsNumber()
  totalProducts: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => FileDTO) // Referencia al DTO genérico de archivo
  proofPayment?: FileDTO;
}