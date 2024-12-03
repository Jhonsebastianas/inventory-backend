import { IsString, IsNumber, IsArray, IsOptional, ValidateNested, IsObject, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { SalePaymentMethodDTO } from './sale-payment-method.dto';
import { FileDTO } from 'src/plugins/file-system/domain/model/dto/file.dto';
import { SaleProductDTO } from './sale-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterClientInDTO } from 'src/plugins/clients/domain/model/dto/register-client-in.dto';

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

  @ApiProperty({ description: 'Cliente', example: new RegisterClientInDTO() })
  @ValidateIf((o) => o.client != null)  // Ejecuta validaciones solo si client no es null o undefined
  @IsOptional()  // Permite que el campo sea opcional
  @ValidateNested()  // Valida las propiedades del objeto si existe
  @Type(() => RegisterClientInDTO)  // Especifica el tipo DTO para la transformación
  client: RegisterClientInDTO;
}