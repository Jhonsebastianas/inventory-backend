import { IdentificationDocumentDTO } from "@core/domain/identification-document.dto";
import { ContactDTO } from "@user/domain/model/dto/contact.dto";

export class ClientDTO {
    id: string;
    businessId: string;
    names: string;
    lastnames: string;
    identification: IdentificationDocumentDTO;
    contact: ContactDTO;
    active: boolean;
}