import { IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { FzUtil } from "@core/util/fz-util";
import { ApiProperty } from "@nestjs/swagger";
import { ContactDTO } from "./contact.dto";

export class UserRegisterDTO {

    @IsNotEmpty({ message: 'El campo nombres es obligatorio' })
    @Transform((names) => FzUtil.toTitleCase(names.value))
    @ApiProperty({ description: 'Nombres del usuario', example: 'John Doe' })
    names: string;

    @IsNotEmpty({ message: 'El campo correo es obligatorio' })
    @Transform((username) => username.value.trim().toLowerCase())
    @ApiProperty({ description: 'Usuario de acceso', example: 'johndoe@email.com' })
    username: string;

    @IsNotEmpty({ message: 'El campo clave es obligatorio' })
    @ApiProperty({ description: 'Clave de acceso del usuario', example: '123456' })
    password: string;

    @ApiProperty({ description: 'Información de contacto del usuario', example: '{ email: "correo@gmail.com", cellular: { value: "3203263030", callsign: "+57" } }' })
    contact: ContactDTO;
    
}