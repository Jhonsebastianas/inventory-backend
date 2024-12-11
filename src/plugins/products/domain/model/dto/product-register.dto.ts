import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { FzUtil } from "@core/util/fz-util";
import { ApiProperty } from "@nestjs/swagger";
import { StockDetailDTO } from "./stock-detail.dto";

export class ProductRegisterDTO {

    @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
    @Transform((names) => FzUtil.toTitleCase(names.value))
    @ApiProperty({ description: 'Nombres del producto', example: 'Emparedado' })
    name: string;

    @Transform((description) => description?.value?.trim().toLowerCase())
    @ApiProperty({ description: 'Descipción del producto (opcional)', example: 'Con jamón y quesito' })
    description: string;

    @IsOptional()
    @Transform((presentation) => presentation?.value?.trim().toLowerCase())
    @ApiProperty({ description: 'Presentación del producto (opcional)', example: 'unidad, 150 ml' })
    presentation: string;

    @IsNotEmpty({ message: 'El campo precio es obligatorio' })
    @ApiProperty({ description: 'Precio unitario del producto', example: '2000' })
    price: number;

    @IsNotEmpty({ message: 'El campo en inventario es obligatorio' })
    @ApiProperty({ description: 'Cantidad de producto en inventario', example: '10' })
    stock: number;

    @IsOptional({ message: 'El campo cantidad en inventario para reordenar es opcional' })
    @ApiProperty({ description: 'Cantidad de producto en inventario para ser reemplazado', example: '8' })
    quantityStockReplenished: number;

    @ApiProperty({ description: 'Detalle del stock', example: [new StockDetailDTO()] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StockDetailDTO)
    stockDetails: StockDetailDTO[];

    @IsOptional()
    @ApiProperty({ description: 'Iva, impuesto', example: '19' })
    percentageTax: number;
    
}