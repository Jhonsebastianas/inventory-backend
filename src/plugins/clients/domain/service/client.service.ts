import { ResponseDTO } from "@core/domain/response.dto";
import { RegisterClientInDTO } from "../model/dto/register-client-in.dto";
import { ClientDTO } from "../model/dto/client.dto";

export interface ClientService {
 
    /**
     * Register a client to the application.
     * Created on 26/04/2024 at 09:54 p.m. <br>
     * 
     * @param { RegisterClientInDTO } clientRegister client to register in the app.
     */
    registerClient(clientRegister: RegisterClientInDTO): Promise<ResponseDTO>;

    /**
     * 
     * @param idType type of identification
     * @param numberIdentification number of identification
     */
    findClientByIdentification(idType: string, numberIdentification: string): Promise<ClientDTO>;
}