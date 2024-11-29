import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class ContactDTO {

    @IsNotEmpty({ message: 'El email es obligatorio' })
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