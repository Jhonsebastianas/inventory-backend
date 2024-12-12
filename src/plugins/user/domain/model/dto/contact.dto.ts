import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ContactDTO {

    @IsNotEmpty({ message: 'El email es obligatorio' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    @Transform((email) => email.value.trim().toLowerCase())
    email: string;

    phone: PhoneDTO;
    
    cellular: PhoneDTO;
}

class PhoneDTO {
    @Transform((value) => value.value.trim().toLowerCase())
    value: string;

    @Transform((callsign) => callsign.value.trim().toLowerCase())
    callsign: string;
}