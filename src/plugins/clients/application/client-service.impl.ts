import { Injectable, Logger } from "@nestjs/common";
import { BusinessServiceImpl } from "src/plugins/business/application/business-service.impl";
import { ClientService } from "../domain/service/client.service";
import { ResponseDTO, ResponseDtoBuilder } from "@core/domain/response.dto";
import { ClientDTO } from "../domain/model/dto/client.dto";
import { RegisterClientInDTO } from "../domain/model/dto/register-client-in.dto";
import { IdentificationDocumentDTO } from "@core/domain/identification-document.dto";
import { TypeIdentificationDTO } from "@core/domain/tipo-identificacion.dto";
import { ClientRepositoryImpl } from "./client-mongo-repository.impl";
import { Client } from "../domain/model/document/client.document";
import { ConflictException } from "@core/exceptions/manager.exception";
import { Types } from "mongoose";
import { ClientMapper } from "../domain/repository/mapper/client.mapper";
import * as fs from "fs";

@Injectable()
export class ClientServiceImpl implements ClientService {

    private readonly logger = new Logger(ClientServiceImpl.name, { timestamp: true });

    constructor(
        private businessService: BusinessServiceImpl,
        private clientRepository: ClientRepositoryImpl,
    ) { }

    async registerClient(clientRegister: RegisterClientInDTO): Promise<ResponseDTO> {
        const client: Client = await this.clientRepository.findByIdentification(clientRegister.identification);

        if (client != null) {
            throw new ConflictException("El cliente ya se encuentra registrado en el sistema");
        }
        const business = await this.businessService.getBusinessWorkingOn();

        // Indentificación
        const documentTypes: TypeIdentificationDTO[] = JSON.parse(fs.readFileSync(process.cwd() + `/public/data/document_types.json`, { encoding: 'utf8', flag: 'r' }).toString());
        const typeDocument = documentTypes.find(document => document.id == clientRegister.identification.type.id);
        clientRegister.identification.type = typeDocument;

        const newClient = new Client();
        newClient.active = true;
        newClient.businessId = new Types.ObjectId(business?.id);
        newClient.contact = clientRegister.contact;
        newClient.identification = clientRegister.identification;
        newClient.lastnames = clientRegister.lastnames;
        newClient.names = clientRegister.names;

        await this.clientRepository.save(newClient);
        return new ResponseDtoBuilder().ok().whitMessage("Cliente registrado con éxito").build();
    }

    async findClientByIdentification(idType: string, numberIdentification: string): Promise<ClientDTO> {
        const identificacion = new IdentificationDocumentDTO();
        identificacion.value = numberIdentification;
        identificacion.type = new TypeIdentificationDTO();
        identificacion.type.id = idType;
        return ClientMapper.mapToClientDTO(await this.clientRepository.findByIdentification(identificacion));
    }

}