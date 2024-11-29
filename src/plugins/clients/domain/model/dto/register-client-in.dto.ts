import { IdentificationDocumentDTO } from "@core/domain/identification-document.dto";
import { FzUtil } from "@core/util/fz-util";
import { ApiProperty } from "@nestjs/swagger";
import { ContactDTO } from "@user/domain/model/dto/contact.dto";
import { Transform } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";

export class RegisterClientInDTO {

    @IsNotEmpty({ message: 'El campo nombres es obligatorio' })
    @Transform((names) => FzUtil.toTitleCase(names.value))
    @ApiProperty({ description: 'Nombres del cliente', example: 'Armando Casas' })
    names: string;

    @IsNotEmpty({ message: 'El campo apellidos es obligatorio' })
    @Transform((lastnames) => FzUtil.toTitleCase(lastnames.value))
    @ApiProperty({ description: 'Apellidos del cliente', example: 'Lindas y Bellas' })
    lastnames: string;

    @IsNotEmpty({ message: 'La identificación es obligatorio' })
    @ApiProperty({ description: 'Identificación del cliente', example: 'Tipo y número de identificación' })
    @ValidateNested()
    identification: IdentificationDocumentDTO;

    @IsNotEmpty({ message: 'El contacto es obligatorio' })
    @ApiProperty({ description: 'Información de contacto del cliente', example: 'email, celular, etc...' })
    @ValidateNested()
    contact: ContactDTO;
}