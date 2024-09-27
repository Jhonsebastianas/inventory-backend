import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class IncomeDTO {
    id: number;

    @ApiProperty({ description: 'Descripción del ingreso', example: 'Salario' })
    @IsNotEmpty({ message: 'La descripción es obligatorio' })
    @Transform((description) => description.value.trim().toLowerCase())
    description: string;

    @ApiProperty({ description: 'Valor monetario del ingreso', example: 1000 })
    @IsNotEmpty({ message: 'El valor es obligatorio' })
    value: number;

    createAt: Date;
}