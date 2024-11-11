import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class RecoverAccountInDTO {
    @IsNotEmpty({ message: 'El campo correo es obligatorio' })
    @Transform((email) => email.value.trim().toLowerCase())
    @ApiProperty({ description: 'Usuario o correo electrónico', example: 'user@example.com' })
    email: string;
}