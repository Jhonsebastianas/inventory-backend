import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class ExpenseDTO {
    id: number;

    @ApiProperty({ description: 'Descripción del gasto', example: 'Arriendo casa' })
    @IsNotEmpty({ message: 'El descripción es obligatorio' })
    @Transform((description) => description.value.trim().toLowerCase())
    description: string;

    @ApiProperty({ description: 'Valor monetario del gasto', example: 1000 })
    @IsNotEmpty({ message: 'El valor es obligatorio' })
    value: number;
    
    createAt: Date;
}