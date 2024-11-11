import { Transform } from "class-transformer";

export class ContactDTO {
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