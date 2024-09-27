import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class SimpleLoginInDTO {

    @IsNotEmpty({ message: 'El campo correo es obligatorio' })
    @Transform((username) => username.value.trim().toLowerCase())
    @ApiProperty({ description: 'Usuario o correo electrónico', example: 'user@example.com' })
    username: string;

    @IsNotEmpty({ message: 'El campo clave es obligatorio' })
    @ApiProperty({ description: 'Clave de acceso', example: '123456' })
    password: string;
}