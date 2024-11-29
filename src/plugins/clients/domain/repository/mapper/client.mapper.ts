import { Types } from "mongoose";
import { Client } from "../../model/document/client.document";
import { ClientDTO } from "../../model/dto/client.dto";


export class ClientMapper {

    static mapToClientDTO(client: Client): ClientDTO {
        if (client == null) {
            return null;
        }
        const clientDTO = new ClientDTO();
        clientDTO.id = client._id?.toString();
        clientDTO.active = client.active;
        clientDTO.businessId = client.businessId?.toString();
        clientDTO.contact = client.contact;
        clientDTO.identification = client.identification;
        clientDTO.lastnames = client.lastnames;
        clientDTO.names = client.names;
        return clientDTO;
    }

    static mapToClient(clientDTO: ClientDTO): Client {
        if (clientDTO == null) {
            return null;
        }
        const client = new Client();
        client._id = new Types.ObjectId(clientDTO?.id);
        client.active = clientDTO.active;
        client.businessId = new Types.ObjectId(clientDTO?.businessId);
        client.contact = clientDTO.contact;
        client.identification = clientDTO.identification;
        client.lastnames = clientDTO.lastnames;
        client.names = clientDTO.names;
        return client;
    }

}  