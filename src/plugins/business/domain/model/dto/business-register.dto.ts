import { FzUtil } from "@core/util/fz-util";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class BusinessRegisterDTO {

    @IsNotEmpty({ message: 'El campo nombres es obligatorio' })
    @Transform((names) => FzUtil.toTitleCase(names.value))
    @ApiProperty({ description: 'Nombres del usuario', example: 'John Doe' })
    name: string;
    
}