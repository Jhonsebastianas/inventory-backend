import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SalesConsultationInDTO {

    @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
    @ApiProperty({ description: 'Fecha de inicio', example: '2024/11/15' })
    startDate: Date; 

    @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
    @ApiProperty({ description: 'Fecha de fin', example: '2024/11/16' })
    endDate: Date;
    
}