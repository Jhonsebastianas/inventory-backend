import { IsString, IsNumber, IsArray, IsOptional, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { SalePaymentMethodDTO } from './sale-payment-method.dto';
import { FileDTO } from 'src/plugins/file-system/domain/model/dto/file.dto';
import { SaleProductDTO } from './sale-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDTO {

  @ApiProperty({ description: 'Productos vendidos', example: [new SaleProductDTO()] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleProductDTO)
  products: SaleProductDTO[];

  @ApiProperty({ description: 'Métodos de pago', example: [new SalePaymentMethodDTO()] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalePaymentMethodDTO)
  paymentMethods: SalePaymentMethodDTO[];

  @ApiProperty({ description: 'Comprobante de pago', example: [new FileDTO()] })
  @IsOptional()
  @ValidateNested()
  @Type(() => FileDTO) // Referencia al DTO genérico de archivo
  proofPayment?: FileDTO;
}