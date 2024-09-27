import { IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { FzUtil } from "@core/util/fz-util";
import { ApiProperty } from "@nestjs/swagger";

export class ProductRegisterDTO {

    @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
    @Transform((names) => FzUtil.toTitleCase(names.value))
    @ApiProperty({ description: 'Nombres del producto', example: 'Emparedado' })
    name: string;

    @Transform((description) => description.value.trim().toLowerCase())
    @ApiProperty({ description: 'Descipción del producto (opcional)', example: 'Con jamón y quesito' })
    description: string;

    @IsNotEmpty({ message: 'El campo precio es obligatorio' })
    @ApiProperty({ description: 'Precio unitario del producto', example: '2000' })
    price: number;

    @IsNotEmpty({ message: 'El campo en inventario es obligatorio' })
    @ApiProperty({ description: 'Cantidad de producto en inventario', example: '10' })
    stock: number;
    
}